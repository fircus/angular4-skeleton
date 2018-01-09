import {Injectable} from '@angular/core';

@Injectable()
export class TransferState {
  private _map = new Map<string, any>();

  constructor() {
  }

  keys() {
    return this._map.keys();
  }

  has(key: string | number): boolean {
    let _key = this.normalizeKey(key);
    return this._map.has(_key);
  }

  get (key: string): any {
    return this._map.get(key);
  }

  set (key: string, value: any): Map<string, any> {
    return this._map.set(key, value);
  }

  clear(): void {
    this._map.clear();
  }

  toJson(): any {
    const obj = {};
    Array.from(this.keys())
      .forEach(key => {
        obj[key] = this.get(key);
      });
    return obj;
  }

  initialize(obj: any): void {
    Object.keys(obj)
      .forEach(key => {
        this.set(key, obj[key]);
      });
  }

  normalizeKey(key: string | number): string {
    if (this._isInvalidValue(key)) {
      throw new Error('Please provide a valid key to save in the CacheService');
    }
    return key + '';
  }

  _isInvalidValue(key): boolean {
    return key === null ||
      key === undefined ||
      key === 0 ||
      key === '' ||
      typeof key === 'boolean' ||
      Number.isNaN(<number>key);
  }

  inject(): void {
  }
}
