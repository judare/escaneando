import Infobip from "./class/infobip";

function CallClass(...args) {
  return new Infobip.class(...args);
}

export default {
  ...Infobip,
  className: 'Sms',
  class: CallClass,
};
