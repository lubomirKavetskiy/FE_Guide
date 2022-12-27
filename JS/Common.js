Типи даних: a) примітивні: — number — string — boolean (true: true, 1; false: false, 0, null, NaN, underfined, »,) — null and undefined b) складені (скл. із примітивних): — object (array, function, reg) Difference: a) передача по назначенню (так працюють примітиви) let a=1, b=a; a=2; console.log(b); // 1 b) передача по ссилці (так працюють складені) let A={c:1}, B=A; //тобто і A i B — це всього лише ссилки на один і той же об’єкт {c:1}, який ми будемо змінювати: B.c=2; console.log(A.c); // 2 B.b = 10; console.log(A.b); // 10 A.c = 3; console.log(B.c); // 3 console.log(A.c); // 3 A = null; console.log(A.c) || console.log(A.b); // error ‘Cannot read property ‘c’ || ‘b’ of null’ // бо A тепер це ссилка на null, ну а B — відповідно дальше собі ссилається на {c:3, b:10} console.log(B.b); // 10 B={c:0}; console.log(B.c); // 0 console.log(B.b); // unndefined, бо B — тепер сиилка на новий об’єкт {c:0}, а об’єкт {c:3, b:10} — це мусор, що видалиться JS з пам’яті (з ‘кучі’) let a; console.log(a); // unndefined console.log(b); //error ‘b is not defined’ let c=null; console.log(c); // null Приведення типів: ’10’ / ‘2’ === 5 true + ‘eee’ === ‘trueee’ 10 + ‘2’ === ‘102’ *string має перевагу над усіма Пошук DOM-елементів для будь-якого елементу, який ми створимо в HTML (навіть пробіл чи абзац) => JS створить відповідний об’єкт із стандартними свойствами (для описування цього елементу)та методами (для керування цим елементом). DOM-дерево — це сукупність цих об’єктів. Воно складається з вузлів. *щоб побачити список властивостей та методів об’єкта (тега): console.dir(document, 1); або console.log(document); 1) document.getElementById(‘firstBlock’) — вибирає елемент по конкретному id ; 2) document.querySelector(‘any CSS-selector*’) — вибирає елемент по першому знайшовшому будь-якому CSS-селектору || document.querySelectorAll(‘any CSS-selector*’) — вибирає всі (на виході отримуємо клолекцію, не масив) елементи по будь-якому CSS-селектору; в обох випадках вибирає елементи методом ‘пошуку в глибину’; *окрім ::after and ::before. let pageHeading = querySelector(‘h1’); Свойства (className, style, ) і методи елементів: Вузол DOM є об’єктом з точки зору JS, у яких, як і у будь-якого об’єкта, можуть бути свойства та методи. Тому будь-якому вузлу можна назначити свойсво (або метод), використовуючи звичайний синтаксис. pageHeading.className = ‘new-class’; console.log(pageHeading.className); Свойства DOM (обєктів) можуть теж бути об’єктами. Для прикладу свойство element.style, яке будучи обє’ктом має свої властивості. pageHeading.style.fontSize = ‘200px’; console.log(pageHeading.style.fontSize); console.log(pageHeading.attributes); Атрибути (class, href):

elem.hasAttribute(name) – перевіряє наявність атрибута
elem.getAttribute(name) – отримує значення атрибута
elem.setAttribute(name, value) – встановлює атрибут
elem.removeAttribute(name) – видаляє атрибут
Значення завжди строкове. pageHeading.setAttribute(‘class’, ‘new-class’); console.log(pageHeading.getAttribute(‘class’)); pageHeading.setAttribute(‘style’, ‘font-size: 200px;’); console.log(pageHeading.getAttribute(‘font-size’)); Коли браузер читає HTML і створює DOM-модель, то він створює свойства для всіх стандартних атрибутів. Всі стандартні свойства DOM синхронізуються з атрибутами (тобто є свойство className, що синхронізується з атрибутом class), однак така синхронізація відбуваєтьмся один в один. Тому нам інколи потрібно саме значення з HTML, тобто атрибут. Для прикладу з href (спочатку це атрибут), змінивши його через свойство href на ‘/’, при виведенні як атрибут ми отримаємо те, на що замінили свойством href (a.getAttribute(‘href’)// ‘/’). А от прививеденні після цього свойства href — отримаємо повний URL (a.href// URL), бо так вимагає специфікація. Тому, якщо ми хочемо отримати те, що є в HTML, слід звертатись до атрибтів. Доречі, є й інші атрибути , що не синхронізуються (копіюються) до точності. Наприклад, DOM-свойство input.checked має логічне значення true/false, а HTML-атрибут checked. Так само й disable. inputSelector.disable = true/false або через атрибут: inputSelector.getAttribute(‘disable’, ‘disable’). Значення усіх атрибутів можна змінити іншими значеннями свойств, і навпаки. Але це не спрацює із таким свойством як ‘value’. Ми не можемо змінити значення атрибута ‘value’ значенням свойства ‘value’ і навпаки. Значення чи то свойства чи то атрибута саме ‘value’ у порівнянні з іншими не синхронізується. Щодо атрибуту class, йому відповідають аж 2 свойства: className та classList. Причому classList* — це об’єкт із свойстави та методами: elem.classList.contains(«class») – повертає true/false, у залежності від того є в елемента класс ‘class’ elem.classList.add/remove(«class») – додає/видаляє класс ‘class’ elem.classList.toggle(«class») – якщо класса ‘class’ нема — додає його, а якщо є – видаляє + можна зробити включення класу примусове, додавши другий аргумент у метод toggle(‘class’, true) *documentQuerySelector(‘.class’).classList — повертає псевдомасив, вивівши який можна подивитись на усі свойства чи методи цього обєкту, що є свойством DOM-елемента; також classList, тк як він повертає псевдо-масив, можна перебрати через for Атрибутам на основі data-anything відповідають свойства dataset.anything. Приклад HTML:

JS: let pageHeading = document.querySelector(‘.first’); console.log(pageHeading.getAttribute(«data-about-something»)); //123 console.log(pageHeading.dataset.aboutSomething); //123 Висновки: Використання DOM-дерева дає можливість розглядати HTML-елемент як object із певними свойствами, які у свою чергу можуть теж бути object і мати відповідні свойства та методи. (style, classList, dataset — object; element.style.fontSize = ’14px’). Use options, not attribute in practise. Атрибути – це те, що написане в HTML-елементах. Свойство – це те, що знаходиться всередині DOM-об’єкта. Таблиця порівнння для атрибутів і свойств: Свойства Атрибути Будь-яке значення Строка Назва регістрозалежна Не чутлива до реєстру Не видні в innerHTML Видні в innerHTML Синхронізація між атрибутами та свойствами: Стандартні свойства і атрибути синхронізуються: установка атрибута автоматично ставить свойство DOM. Деякі свойства синхронізуються в обидві сторони. Буває так, що свойство не зовсім відповідає атрибуту. Наприклад, «логічні» свойства на зразок checked, selected завжди мають значення true / false, а в атрибут можна записати довільну строку. Є й інші приклади на цю тему, наприклад href. Нестандартні атрибути: Нестандартний атрибут (якщо забути глюки старих IE) ніколи не потрапить в властивість, так що для крос-браузерного доступу до нього потрібно обов’язково використовувати getAttribute. Атрибути, назва яких починається з data-, можна прочитати через dataset. Ця можливість не підтримується IE10-. Для того, щоб уникнути проблем зі старими IE, а також для більш короткого і зрозумілого коду намагайтеся всюди використовувати властивості, а атрибути — тільки там, де це дійсно потрібно. Насправді атрибути потрібні дуже рідко — лише в наступних трьох випадках: Коли потрібно кросбраузерну отримати нестандартний HTML-атрибут. Коли потрібно отримати «оригінальне значення» стандартного HTML-атрибуту, наприклад, input type=»text» value=»…». Коли потрібно отримати список всіх атрибутів, включаючи користувацькі. Для цього використовується колекція attributes. Якщо ви хочете використовувати власні атрибути в HTML, то пам’ятайте, що атрибути з ім’ям, що починається на data- валідність в HTML5 і сучасні браузери підтримують доступ до них через властивість dataset.

Методи DOM-елементів:
Рух по вузлах div.parentNode — батько div’a *div.nextSibling — правий сусід div’a (слід пам’ятати про абзаци і пробіли в HTML-розмітці, для яких JS теж створить object) *div.previousSibling — лівий сусід div’a (слід …-//-) *childNodes — верне колекцію дітей *firstChild — перша дитина *lastChild — остання дитина *слід пам’ятати про абзаци і пробіли в HTML-розмітці, для яких JS теж створить object і буде їх вертати як #text Рух по елементах parentElement — поверне батька previousElementSibling — елемент зліва nextElementSibling — елемент справа children — колекція дітей firstElementChild — перша дитина lastElementChild — остання дитина *в елементах на відміну від вузлівDOM’a абзаци та відступи до уваги не беруться перевірка на вложеність: var result = nodeA.contains( nodeB) //true || false визначення порядку вузлів: var result = nodeA.compareDocumentPosition(nodeB)//бітова маска (https://learn.javascript.ru/compare-document-position) створення елементу: let div = document.createElement(‘div’) вставка вкінець елемента: parentElem.appendChild(elem) вставка в елемент на початок: parentElem.insertBefore(elem, parentElem.firstChild) вставка в елемент перед конкретним елементом-дитиною: parentElem.insertBefore(elem, nextSibling) *parentElem.insertBefore(elem, null) = = parentElem.appendChild(elem) видалення вузла: parentElem.removeChild(elem) або elem.remove()  заміна одного елемента іншим: parentElem.replaceChild(newElem, elem) // замінює elem і повертає його клонування елементу elem.cloneNode() — поерхневе (обгортка) elem.cloneNode(true) — глибоке Сучасні методи node.append(…nodes) – вставляє nodes в кінець node, node.prepend(…nodes) – вставляє nodes в початок node, node.after(…nodes) – вставляє nodes після вузла node, node.before(…nodes) – вставляє nodes перед вузлом node, node.replaceWith(…nodes) – вставляє nodes замість node. *як nodes можна вставляти ‘текст’ вставити текст із внутрішніми тегами: elem.innerHTML = «text<b>fatty</b>text» вставити текст із тегами: elem.outerHTML = «<p>text<b>fatty</b>text</p>» вставити сам текст: elem.contentText = «text» для шаблонізації: document.querySelector(‘template’).content *вміст template не відображається на момент завантаження сторінки

Собитія
let but = document.querySelector(‘.clickable’), buttonClickFirstTimeHandler = function() { alert(‘clicked first time’); }, buttonClickSecondTimeHandler = function() { alert(‘clicked second time’); }; buttonClickHandlerFirstTime, buttonClickSecondTimeHandler, ці функції — це обработчики собитій або хендлери (ті, що керують собитіям), які передаються як другий аргумент у метод addEventListener чи removeEventListener buttonClickHandler, inputFocusHandler або onButtonClick, onInputFocus — правильна назва обработчиків собитія (хендлерів) but.addEventListener(«click», buttonClickFirstTimeHandler); but.addEventListener(«click», buttonClickSecondTimeHandler); but.removeEventListener(«click», buttonClickFirstTimeHandler); при кожному генеруванні будь-якого собитія (click, focus…), JS створює для цього собитія об’єкт event. Для отримання свойст чи методів цього об’єкта, цей об’єкт слід передати  його як параметр у функцію хендлер. Кожен обработчик (або функція хендлер) має доступ до свойств цього об’єкту event. Найпоширеніші свойства event: event.target — самий глибокий елемент на якому відбулось собитіє (<span>); event.currentTarget( == this) — елемент на якому в даний момент спрацював обработчик  (до якого доплило собитія) При натисканні на span:  *метод button.addEventListener відрізняється від метода button.onclick тим, що навішуючи на  button одне і теж собитія (наприклад — click) за допомогою addEventListener ми можемо викликати декілька різних обработчиків  (хендлерів), чого не можна зробити використвуючи onClick (відбудеться перезаписування хендлера). button.addEventListener(‘click’, ()=> alert(1)); button.addEventListener(‘click’, ()=> alert(2)); click// 1, 2 button.onclick = ()=> alert(1)); button.onclick = ()=> alert(2)); click//  2

ВСПЛИТТЯ
якщо поставити хендлер на body, на блок і на кнопку, що у ньому. То, при натисканні лише на кнопку, спочатку спрацює хендлер кнопки, потім самостійно спрацює хендлер блока і вкінці також сам спрацює хендлер на body. Такий ефект називається всплиттям. Такий ефект спрацьовує при назначенні хендлера для кожного з лемента через  .on, .addEventListener або коли у  .addEventListener прописуємо третій параметр «false» (який стоїть по дефолту ). Приклад використання цього ефекту у методі  делегування: є багато кнопок, при натискання на які будемо отримувати дані для аналітики. Щоб не вішати обработчик на кожну кнопку через addListener, можна скористатись  вищезгаданим ефектом. А саме, просто повісити обработчик на body і для прикладу виводити event.turget.

ПОГРУЖЕННЯ
умови ті самі, але при назначенні хендлера через addEventListener прописуємо третій параметр «true» (по дефолту — ‘false’). У такому випадку спочатку спрацює хендлер body, потім автоматично на блоку і вкінці самостійно на кнопці. *Використовується рідко на практиці. Для зупинки всплиття або погруження event.stopPropogation()   будь-функція  має this лише у момент виклику. bind відрізняється від call і apply лише тим, що він не викликає функцію, а лише її повертає (тіло). У нього також можна передати і другі параметри як і в call та apply.

function callBack
два способи викоритсання ф-й колбеків: 1) в об’єкті  2) у функції