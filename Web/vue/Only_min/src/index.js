const App = {
  data() {
    return {
      count: 0,
      rawHtml: '<span style="color:red">mie</span>',
      urler: '#',
      obj: {
        id: 'mie',
        class: 'haha m',
      },
      now: Date(),
      classObj: {
        active: false,
        err: true,
      },
      items: {
        uid: '2333',
        name: 'fish',
        value: 45,
      },
      checkedNames: [],
      selected: '',
      options: [
        { text: 'One', value: 'A' },
        { text: 'Two', value: 'B' },
        { text: 'Three', value: 'C' },
      ],
    };
  },
  mounted() {
    this.Now();
  },
  methods: {
    adding() {
      this.count++;
    },
    getUrl() {
      this.urler = document.querySelector('#url').value;
    },
    Now() {
      setInterval(() => (this.now = Date()), 1000);
    },
  },
  computed: {},
};
const vm = Vue.createApp(App).mount('#app');
