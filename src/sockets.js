import openSocket from 'socket.io-client';
import {BACKEND_URL} from './settings'

const socket = openSocket(BACKEND_URL);

export function subscribeFeatures(onFeatureSave, onFeatureRemove) {
  socket.on('thing:save', feature => onFeatureSave(feature));
  socket.on('thing:remove', feature => onFeatureRemove(feature));
  socket.emit('connection');
}

export function unsubscribeFeatures() {
  socket.emit('disconnect');
}
