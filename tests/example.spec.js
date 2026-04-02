const { test, expect } = require('@playwright/test');

test.describe('Тренажер друку: Критичний шлях', () => {
    
    test('Користувач може почати друкувати та бачити результат', async ({ page }) => {
        // 1. Відкриваємо сторінку (замініть на ваш локальний шлях або URL)
        await page.goto('file:///Users/annaus/Desktop/3_course/2_semester/%D0%A3%D0%BF%D1%80%D0%B0%D0%B2%D0%BB%D1%96%D0%BD%D0%BD%D1%8F%20IT-%D0%BF%D1%80%D0%BE%D1%94%D0%BA%D1%82%D0%B0%D0%BC%D0%B8/typing-speed-app/index.html');
        // 2. Чекаємо, поки всередині .typing-text з'явиться хоча б один span
        const firstSpan = page.locator('.typing-text span').first();
        await expect(firstSpan).toBeVisible({ timeout: 5000 });

        // 3. Знаходимо інпут та фокусуємось
        const inputField = page.locator('.input-field');
        await inputField.focus();

        // 4. Отримуємо символ, який потрібно надрукувати (щоб тест був "зеленим")
        const charToType = await firstSpan.innerText();
        
        // 5. Друкуємо цей символ
        await page.keyboard.type(charToType);

        // 6. Тепер перевіряємо клас. 
        // Використовуємо .toHaveClass, бо ми точно знаємо, що символ правильний
        await expect(firstSpan).toHaveClass(/correct/);
    });
  });