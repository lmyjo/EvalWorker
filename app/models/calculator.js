
module.exports = {
  getVPN: function getVPN(evalObject){
    return new Promise((resolve, reject) => {
      if(evalObject.operations) {
        resolve({
          vpUp: 10,
          vpDown: 1,
          vpn: 9
        });
      } else {
        reject({error:'The evalObject does not has operations'});
      }
    });
  },
  getTIR: function getTIR(vpn){
    return new Promise((resolve, reject) => {
      vpn.tir = 0.04;
      resolve(vpn);
    });
  },
  getBC: function getBC(vpn){
    return new Promise((resolve, reject) => {
      vpn.bc = 10;
      resolve(vpn);
    });
  }
}
