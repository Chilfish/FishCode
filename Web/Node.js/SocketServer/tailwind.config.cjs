/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,css}'],
  theme: {
    extend: {
      colors: {
        main: {
          0: '#9d98a9',
          1: '#6a5f80',
          2: '#333039',
          3: '#3a3641',
          4: '#28262e',
          5: '#1e1b23',
        },
        gray: {
          input: '#5c6468',
        },
        mes: {
          left: '#1f2426',
          right: '#477360',
        },
      },
      height: {
        '1/10': '10%',
        '9/10': '90%',
      },
      backgroundImage: {
        chat: "url('/public/img/chatBg.png')",
      },
    },
  },
  plugins: [],
};
