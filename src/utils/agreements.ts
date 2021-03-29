const WELCOME_SURPRESSED = 'DEC_WELCOME_SURPRESSED';

export const isWelcomeSurpressed = () => localStorage.getItem(WELCOME_SURPRESSED) === 'TRUE' ? true : false;
export const surpressWelcome = () => localStorage.setItem(WELCOME_SURPRESSED, 'TRUE');