"use strict"
const lmyjoType = require('lmyjo-type');
const factors = require('../utils/factors');

function getEffectiveRate (operation) {
  let timeUnit = lmyjoType.getUnidadTiempo(operation.unidad_tiempo);
  let nominalRate = operation.tasa_interes;
  if (timeUnit === lmyjoType.getUnidadTiempo('año')) {
    return nominalRate;
  }
  return nominalRate / timeUnit;
}


function calculatePresent (operation) {
  let factorType = lmyjoType.getTipoFactor(operation.tipo_factor);
  let rate = getEffectiveRate(operation);
  switch (factorType) {
    case lmyjoType.getTipoFactor('simple'):
      return factors.getFromFuture(
        operation.periodo_inicial,
        rate,
        operation.cantidad_monetaria
      );
    case lmyjoType.getTipoFactor('periodico'):
      return factors.getFromSerie(
        operation.periodo_inicial,
        rate,
        operation.cantidad_monetaria,
        operation.duracion
      );
    case lmyjoType.getTipoFactor('gradiente'):
      return factors.getFromGradient(
        operation.periodo_inicial,
        rate,
        operation.cantidad_monetaria,
        operation.duracion,
        operation.incremento
      );
    default:
      return 0;
  }
}

function calculateVPN (operations) {
  let vpnObject = {
    vpUp: 0,
    vpDown: 0,
    vpn: 0
  };
  for (var i = 0; i < operations.length; i++) {
    let present = calculatePresent(operations[i]);
    console.log(present);
    let movementType = lmyjoType.getTipoMovimiento(operations[i].tipo_operacion);
    if (movementType === lmyjoType.getTipoMovimiento('egreso')) {
      vpnObject.vpDown += present;
    } else {
      vpnObject.vpUp += present;
    }
  }
  vpnObject.vpn = vpnObject.vpUp - vpnObject.vpDown;
  return vpnObject;
}

module.exports = {
  getVPN: function getVPN(evalObject){
    return new Promise((resolve, reject) => {
      if(evalObject.operations) {
        let vpn = calculateVPN(evalObject.operations);
        resolve(vpn);
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
      vpn.bc = (vpn.vpDown > 0)? vpn.vpUp / vpn.vpDown : vpn.vpUp;
      resolve(vpn);
    });
  }
}
