import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import Scrollspy from 'vue2-scrollspy';
// import money from 'v-money'
import  './index.css'

import AppModal from "@/components/Backoffice/AppModal.vue";
import AppInput from "@/components/Form/AppInput.vue";
import AppButton from "@/components/Form/AppButton.vue";



let vue = createApp(App);

vue.mixin({
  methods: {
    replaceAll(target, search, replacement) {
      return `${target}`.split(search).join(replacement);
    },
    money: n => {
      var c = 0,
        d = ",",
        t = ".",
        s = n < 0 ? "-" : "",
        i = String(parseInt((n = Math.abs(Number(n) || 0).toFixed(c)))),
        j = (j = i.length) > 3 ? j % 3 : 0;
      return (
        s +
        (j ? i.substr(0, j) + t : "") +
        i.substr(j).replace(/(\d{3})(?=\d)/g, `$1${t}`) +
        (c
          ? d +
            Math.abs(n - parseInt(i))
              .toFixed(c)
              .slice(2)
          : "")
      );
    },

    formatDate: date => {
      let d = new Date(date),
        month = `${d.getMonth() + 1}`,
        day = `${d.getDate()}`,
        year = d.getFullYear();

      if (month.length < 2) month = `0${month}`;
      if (day.length < 2) day = `0${day}`;

      return [year, month, day].join("-");
    },

    overflowText: (text, char_counter = 50) => {
      if (text.length > char_counter) {
        return `${text.substr(0, 5)}...${text.substr(-5)}`;
      }

      return text;
    },
    paginate: (page, paginate) => {
      if (!paginate.to) {
        return [];
      }
      const offset = 5;
      let from = paginate.current_page - offset;
      if (from < 1) {
        from = 1;
      }

      let to = from + offset * 2;
      if (to >= paginate.last_page) {
        to = paginate.last_page;
      }

      const pagesArray = [];
      while (from <= to) {
        pagesArray.push(from);
        from++;
      }
      return pagesArray;
    },

    showData(miner, key) {
      const data = miner[key];

      const type = miner.type_miner;
      const unitName = type ? type.unitName : "TH/S";
      const perType = type ? type.units : 1;
      if (!data) return 0;

      try {
        (data * perType) / 1000;
      } catch (e) {
        return;
      }

      const number = Math.floor(((data * perType) / 1000) * 100) / 100;
      // number = this.money(number, 2, '.', ',');

      return `${number} ${unitName}`;
    },

    round(number, key) {
      return Math.floor(number * 10 ** key) / 10 ** key;
    },

    toHours(minutes) {
      return Math.ceil(minutes / 60);
    }
  }
});


vue.use(store)
.use(router)
.component("app-modal", AppModal)
.component("app-input", AppInput)
.component("app-button", AppButton)
// .use(Scrollspy)
// .use(money)
.mount('#app')
