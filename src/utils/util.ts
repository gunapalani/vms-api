import { CONFIG } from '@/environment/environment.appSettings';
import { ObjectId } from 'bson';

/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
export const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (typeof value === 'undefined' || value === undefined) {
    return true;
  } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
};

export const IsObject = (value: string | number | object): boolean => {
  if (value === null) {
    return false;
  } else if (typeof value !== 'number' && value === '') {
    return false;
  } else if (value === 'undefined' || value === undefined) {
    return false;
  } else if (value !== null && typeof value === 'object' && Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
};

/**
 * @method getRedisKey
 * @param { String} id
 * @param {String} collectionType
 * @returns {string} key
 * @description form Redis key
 */
export const getRedisKey = (id: string, collectionType: string): string => {
  return id ? `${CONFIG.REDIS_PARTITION_KEY}_${id}` + collectionType : '';
};
