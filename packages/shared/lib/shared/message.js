"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageAck = void 0;
var MessageAck;
(function (MessageAck) {
    MessageAck[MessageAck["ACK_ERROR"] = -1] = "ACK_ERROR";
    MessageAck[MessageAck["ACK_PENDING"] = 0] = "ACK_PENDING";
    MessageAck[MessageAck["ACK_SERVER"] = 1] = "ACK_SERVER";
    MessageAck[MessageAck["ACK_DEVICE"] = 2] = "ACK_DEVICE";
    MessageAck[MessageAck["ACK_READ"] = 3] = "ACK_READ";
    MessageAck[MessageAck["ACK_PLAYED"] = 4] = "ACK_PLAYED";
})(MessageAck = exports.MessageAck || (exports.MessageAck = {}));
