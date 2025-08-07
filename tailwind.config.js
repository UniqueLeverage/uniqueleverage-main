/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#fff',
                mainBlack: '#333333',
                mainDarkBlack: '#1C1F24',
                mainGray: '#838C94',
                mainBlue: '#1B74E4',
                mainLightBlue: '#488FE9',
                mainStroke: '#C7DBE8',
                mainSecondBg: '#F1F2F3',
                elementBackground: '#FDFDFD',
                mainDarkGreen: '#289B22',
                mainLightGreen: '#E0F7DE',
                mainDarkRed: '#EF2E2E',
                mainLightRed: '#FAE9E9',
                darkGray: '#575F66',
                mainYellow: '#d4c064',
                mainNavColor: '#8d9093',
            },
            fontSize: {
                'xxs': '0.7rem',
                'md': '15px',
            },
            fontFamily: {
                publicSans: ['Public Sans', 'sans-serif'],
                raleway: ['Raleway', 'sans-serif'],
            },
            boxShadow: {
                innerCustom: 'inset -2px 0px 0px 0px rgba(108, 117, 125, 0.15)',
                dropCustom: '0 1px 8px 0 rgb(0 0 0 / 8%)',
                dropCustomLighter: '0 0 4px 0 rgba(170, 178, 183, 0.6)',
                dropBottomCustom: '0 4px 4px 0 rgba(0, 0, 0, 0.08)',
                focusInputShadow: 'inset 0 0 0 1px #006bff',
                canvasDropShadow: '0px 1px 6px 0px rgba(0, 0, 0, 0.1)',
            },
            height: {
                'calc-100-minus-56': 'calc(100% - 56px)',
            },
            backgroundImage: {
                hoverGradient: 'linear-gradient(to bottom, #FAFAFA, rgba(255, 255, 255, 1) 50px)',
            },
        },
    },
    plugins: [],
}