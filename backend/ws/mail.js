import Mailgun from "./class/mailgun";

function CallClass(...args) {
  return new Mailgun.class(...args);
}

export default {
  ...Mailgun,
  className: 'Mail',
  class: CallClass,
};
