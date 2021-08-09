/**
 * Localstorage manager class
 */
export class StorageManager {

  /**
   * Constructor
   * @param {String} chatbotId Chatbot application identifier
   */
  constructor(id) {
    this.TTL = 1000 * 3600 * 24 * 2; // 2 days in milliseconds
    this.DATA_INDEX = id + '_storage_data';
    this.checkExpiration();
  }

  /**
   * Check expiration and remove data if expired
   */
  checkExpiration() {
    let currentIndex = Object.keys(this.data)[0];
    if (Date.now() > currentIndex) this.clear();
  }

  /**
   * Get data from storage and create a new one if empty
   * @return {Object}        Index data
   */
  get data() {
    let data = JSON.parse(localStorage.getItem(this.DATA_INDEX));
    if (typeof data !== 'object' || data === null) { // storage no exists
      data = {};
      data[Date.now() + this.TTL] = {};
      return data;
    } else if (Object.keys(data).length < 1) { // storage exists with no data
      data[Date.now() + this.TTL] = {};
      return data;
    } else { // storage exists with data
      return data;
    }
  }

  /**
   * Retrieves an index value from our data object
   * @param  {String} index  Index name to check
   * @return {Object}        Index data
   */
  get(index) {
    let currentIndex = Object.keys(this.data)[0];
    return this.data[currentIndex][index];
  }

  /**
   * Store a value in our data object.
   * @param {String}  index  Index name
   * @param {String}  value  Item value
   */
  set(index, value) {
    let data = this.data;
    let currentIndex = Object.keys(data)[0];
    data[currentIndex][index] = value;
    localStorage.setItem(this.DATA_INDEX, JSON.stringify(data));
  }

  /**
   * Clear storage data
   */
  clear() {
    localStorage.removeItem(this.DATA_INDEX);
  }
}
