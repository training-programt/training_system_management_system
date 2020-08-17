const Utils = {
  isSubArray: (arr1, arr2) => {
    let flag = false;
    for(let i of arr1) {
      flag = arr2.includes(i);
    }
    return flag;
  },

}

export default Utils;