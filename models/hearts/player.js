/*
 *
 * An immutable Player of Hearts
 *
 */

 function Player({
     hand,
     score
 }) {
     this.hand = hand;
     this.score = score;
 }

Player.prototype = {
};

 module.exports = {
     create: function (hand, score) {
         return new Player(hand, score);
     }
 };
