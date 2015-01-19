'use strict';

export default function slug (string) {
  return (string || '').toLowerCase().replace(' ', '_');
}