module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      primary: 'Saira',
      secondary: 'Poppins',
      logoTitle: 'Saira Stencil One'
    },
    container: {
      padding: {
        DEFAULT: '1.5rem',
        // lg: '3rem',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      colors: {
        primary: '#04ddb2',
        second: '#23262F',
        third: '#00457c',
        accent: '#286F6C',
        grey: {
          DEFAULT: '#919297',
          1: '#b5b6bd',
          2: '#E7E9EB',
          3: '#F5F5F5',
          4: '#F6F6F6',
          5: '#eef0f2',
        },
        white: '#fff',
        pink: 'pink',
      },
      backgroundImage: {
        hero: 'url("/src/assets/img/hero-bg.png")',
        newsletter: 'url("/src/assets/img/newsletter.png")',
      },
      dropShadow: {
        primary: '0px 4px 10px rgba(15, 27, 51, 0.05);',
      },
    },
  },
  plugins: [],
};
