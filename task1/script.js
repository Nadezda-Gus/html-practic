// Получаем ссылку на элемент, куда будем выводить результаты
const resultDiv = document.getElementById("result");

// Функция для получения всех постов
async function getAllPosts() {
    // Показываем индикатор загрузки
    resultDiv.innerHTML =
        '<p class="text-center text-gray-500 animate-pulse">Загрузка постов...</p>';

    try {
        // Отправляем GET запрос
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        // Преобразуем ответ в JSON
        const posts = await res.json();

        // Формируем HTML для первых 10 постов
        let html = `<h3 class="text-xl font-bold mb-4">Получено ${posts.length} постов (показываем первые 10)</h3>`;

        posts.slice(0, 1000).forEach((post) => {
            html += `
                <div class="mb-6 p-5 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700/30">
                    <h4 class="text-lg font-semibold mb-2">${post.title}</h4>
                    <p class="text-gray-700 dark:text-gray-300">${post.body}</p>
                    <div class="mt-3 text-sm text-gray-500 dark:text-gray-400">
                      userId: ${post.userId} • postId: ${post.id}
                    </div>
                </div>
            `;
        });

        // Выводим результат
        resultDiv.innerHTML = html;
    } catch (err) {
        // Обрабатываем ошибку
        resultDiv.innerHTML = `
            <p class="text-red-600 font-medium">Ошибка: ${err.message}</p>
            <p class="text-sm text-gray-500 mt-2">Проверьте консоль (F12) для деталей</p>
        `;
        console.error(err);
    }
}

// Функция для получения поста с id = 5
async function getPost5() {
    // Показываем индикатор загрузки
    resultDiv.innerHTML =
        '<p class="text-center text-gray-500 animate-pulse">Загрузка поста №5...</p>';

    try {
        // GET запрос к конкретному посту
        const res = await fetch("https://jsonplaceholder.typicode.com/posts/5");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const post = await res.json();

        // Отображаем полученный пост
        resultDiv.innerHTML = `
            <h3 class="text-xl font-bold mb-4">Пост №5</h3>
            <div class="p-5 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700/30">
                <h4 class="text-lg font-semibold mb-2">${post.title}</h4>
                <p class="text-gray-700 dark:text-gray-300">${post.body}</p>
                <div class="mt-3 text-sm text-gray-500 dark:text-gray-400">
                    userID: ${post.userId} • postId: ${post.id}
                </div>
            </div>
        `;
    } catch (err) {
        resultDiv.innerHTML = `<p class="text-red-600 font-medium">Ошибка: ${err.message}</p>`;
        console.error(err);
    }
}

// Функция для создания нового поста
async function createPost() {
    // Получаем значения полей ввода
    const titleEl = document.getElementById("title");
    const bodyEl = document.getElementById("body");

    // Используем значения или подставляем тестовые
    const title = titleEl.value.trim() || "Тестовый заголовок";
    const body = bodyEl.value.trim() || "Тестовый текст поста";

    // Индикатор отправки
    resultDiv.innerHTML =
        '<p class="text-center text-gray-500 animate-pulse">Отправка POST-запроса...</p>';

    try {
        // Отправляем POST запрос с данными
        const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, body, userId: 1 })
        });

        const data = await res.json();

        // Показываем результат создания
        resultDiv.innerHTML = `
            <h3 class="text-xl font-bold mb-4 text-green-600">POST-запрос успешен!</h3>
            <div class="p-5 border border-green-200 dark:border-green-800 rounded-lg bg-green-50 dark:bg-green-900/20">
                <p><strong>Статус:</strong> ${res.status}</p>
                <p><strong>Новый id:</strong> ${data.id}</p>
                <p><strong>Заголовок:</strong> ${data.title}</p>
                <p class="mt-3 text-sm text-gray-500">Тело: ${data.body.substring(0, 120)}${data.body.length > 120 ? "..." : ""}</p>
            </div>
        `;
    } catch (err) {
        resultDiv.innerHTML = `<p class="text-red-600 font-medium">Ошибка при создании поста: ${err.message}</p>`;
        console.error(err);
    }
}