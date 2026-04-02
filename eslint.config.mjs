import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    // Вказуємо ESLint, що ми працюємо в браузері
    languageOptions: { 
      globals: globals.browser 
    } 
  },
  pluginJs.configs.recommended, // Базові правила перевірки
  {
    rules: {
      "no-unused-vars": "warn",   // Попереджати про невикористані змінні
      "no-console": "off",        // Дозволити console.log
      "no-undef": "error"         // Сваритися на неоголошені змінні
    }
  }
];