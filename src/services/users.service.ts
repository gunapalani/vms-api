import { Service } from 'typedi';
import { HttpException } from '@exceptions/httpException';
import { User } from '@interfaces/users.interface';
import { userCollection } from '@models/users.model';
import { isEmpty } from '@/utils/util';
import { CreateUserDto } from '@/dtos/users.dto';
import { Types } from 'mongoose';
import { AzureADService } from './azureAD.service';

@Service()
export class UserService {
  private users = userCollection;
  public azureADService = new AzureADService();
  public async findAllUser(): Promise<User[]> {
    const usersList: User[] = await this.users.find();
    return usersList;
  }

  public async findUserById(userId: string): Promise<User> {
    const findUser: User = await this.users.findOne({ _id: userId });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  public async createUser(userData: User): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'Empty User Data is not allowed');
    if (userData._id) throw new HttpException(400, '_id is not allowed');
    if (!userData.userId) throw new HttpException(400, 'User Id is required');
    const findUser: User = await this.users.findOne({ userId: userData.userId }).exec();
    if (findUser) throw new HttpException(409, `This userId ${userData.userId} already exists`);

    const createUserData: User = await this.users.create({ ...userData });

    return createUserData;
  }

  public async updateUser(userId: string, userData: User): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'Empty User Data is not allowed');
    const findUser: User = await this.users.findById(userData._id).exec();
    if (!findUser) {
      throw new HttpException(409, 'User data does not exist');
    }
    const updatedUser: User = await this.users.findByIdAndUpdate(userId, { ...userData }, { new: true }).exec();
    if (!updatedUser) throw new HttpException(409, "User doesn't exist");

    return updatedUser;
  }

  public async deleteUser(userId: string): Promise<User> {
    const deleteUserById: User = await this.users.findByIdAndDelete(userId).exec();
    if (!deleteUserById) throw new HttpException(409, "User doesn't exist");

    return deleteUserById;
  }

  public async createADB2CUserAsync(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'Please fill all required fields');
    const user: User = await this.users
      .findOne({
        phoneNumber: userData.phoneNumber,
        ...(userData?._id && { _id: { $ne: Types.ObjectId(userData._id?.toString()) } }),
      })
      .exec();
    if (user) throw new HttpException(409, `Your PhoneNumber ${userData?.phoneNumber} already exists`);
    let createUserData;
    if (!userData?.userId) {
      const adb2cUserId = await this.azureADService.createUser(userData);
      userData.userId = adb2cUserId;
      createUserData = new this.users(userData);
    } else {
      const findUser: User = await this.users
        .findOne({
          phoneNumber: userData.phoneNumber,
          ...(userData?._id && { _id: { $eq: Types.ObjectId(userData._id?.toString()) } }),
        })
        .exec();
      await this.azureADService.updateUser(userData, findUser.userId);
      createUserData = Object.assign(findUser, userData);
    }
    createUserData = await createUserData.save();
    return createUserData;
  }

  public async deleteADB2CUserAsync(userId: string): Promise<User> {
    if (isEmpty(userId)) throw new HttpException(400, 'UserId is required');
    const deleteUser: User = await this.users.findOne({ _id: userId }).exec();
    if (!deleteUser) throw new HttpException(409, "You're not user");
    await this.azureADService.deleteUser(deleteUser.userId);
    await this.users.deleteOne({ _id: userId }).exec();
    return deleteUser;
  }

  public async updateADB2CUserAsync(modifiedUser: CreateUserDto, userId: string): Promise<User> {
    if (isEmpty(modifiedUser)) throw new HttpException(400, 'Empty User Data is not allowed');
    if (isEmpty(modifiedUser.userName)) throw new HttpException(400, 'UserName is required');
    if (isEmpty(userId)) throw new HttpException(400, 'User Id is required');
    const findUser: User = await this.users.findOne({ userId: userId });
    const updateUser: User = Object.assign(findUser, modifiedUser);
    await this.azureADService.updateUser(modifiedUser, userId);
    const updatedUser = await this.users
      .findOneAndUpdate(
        { userId: userId },
        {
          $set: {
            userName: updateUser.userName,
            phoneNumber: updateUser.phoneNumber,
            email: updateUser.email,
            profileImageUrl: updateUser.profileImageUrl,
            roles: updateUser.roles,
          },
        },
        {
          new: true,
        },
      )
      .exec();
    return updatedUser;
  }
}
