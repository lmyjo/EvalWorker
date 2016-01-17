"use strict"

function getPresentFromFuture (period, rate, quantity) {
  let factor = Math.pow((1 + rate), period);
  return quantity / factor;
}

function getPresentFromAnual (period, rate, quantity, duration) {
  let factor = rate * Math.pow((1 + rate), duration);
  factor /= (Math.pow((1 + rate), duration) - 1);
  let present = quantity / factor;
  if (period <= 1) {
    return present;
  }
  return getPresentFromFuture(period, rate, present);
}

function getPresentFromGradient (period, rate, quantity, duration, increment) {
  let gradient = Math.abs(increment - quantity) / (duration - 1);
  let serie = (increment >= quantity)? quantity : increment;
  let factor = Math.pow(1 + rate, duration) - 1;

  factor = factor / (rate * Math.pow(1 + rate, duration));
  factor -= (duration / Math.pow(1 + rate, duration));
  factor = factor / rate;

  let presentGradient = gradient * factor;
  presentGradient = (period <= 1)? presentGradient
                                  : getPresentFromFuture(period, rate, presentGradient);
  let presentSerie = getPresentFromAnual(period, rate, serie, duration);
  return presentGradient + presentSerie;
}

module.exports = {
  getFromFuture: getPresentFromFuture,
  getFromSerie: getPresentFromAnual,
  getFromGradient: getPresentFromGradient
}
