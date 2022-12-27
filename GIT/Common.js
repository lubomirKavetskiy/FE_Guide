проіндексувати — $ git add .(filename) == індесація — додавання файлу у Git == документ в індексі (індекс ще називають stage area)
зафіксувати — $ git commit -m «name of commit»;
файл потрапляє у робочий каталог Git після будь-якої зміни (непроіндексованої);

type of files:
untruced (невідслідковувані) — ті, що створені, але недодані в Git ($ git add );
truced (відслідковувані або під версійним контролем) — ті, що створені і додані в Git (можуть бути у такому вигляді: незмінені, змінені або підготовлені до коміту);
unmerged (незлиті) — ті, у яких під час мержу виник конфлікт (у них були зміни як на обидвох гілках, що мержаться);

type of branchs:
origin — віддалена на репозиторії

probable result of $ git status:
«Change to be committed» — файл змінений і доданий в git через $ git add .(filename); залишається $ git commit -m…;
«Change not stage for commit» — файл змінений, але недоданий в Git; залишається 1)$ git add…, 2)$ git commit -m…;

Before every commit you have to:
1) $ git status
2) $ git add . || $ git add fileName
3) $ git status
4) $ git commit -m «name ‘commit'»
*$ git push origin —delete nameBranch || git push

Main commands:
$ git help nameOfComand — справка по конкретній команді;

$ git checkout -b newBranch — створити і переключитись на нову гілку (*потрібно враховувати на якій стоїш, відбиватись будеш від неї);

$ git branch -D nameBranch — видалити гілку локально (*потрібно стояти на іншій)(переключився на іншу, виконав команду + $ git push — гілка також видалилась у репозиторії);
$ git push origin —delete nameBranch — видалити гілку віддалено;

$ git add . — додати зміни усіх файлів;
$ git add fileName — додати зміни конкретного файлу;

$ git commit -m «name ‘commit'» — закомітити;
$ git commit -a -m «name ‘commit'» — додати файли (за умови, що файли вже відслідковуються) і закомітити;

$ git log — побачити всі коміти гілки на якій стоїш (+ всі коміти гілки від якої відбився);
$ git log —oneline — вивести лише назви комітів;
$ git log -1 — вивести останній коміт на гілці;

$ git log —graph —abbrev-commit —decorate —format=format:’%C(bold blue)%h%C(reset) — %C(bold cyan)%aD%C(reset) %C(bold green)(%ar)%C(reset)%C(bold yellow)%d%C(reset)%n» %C(white)%s%C(reset) %C(dim white)- %an%C(reset)’ —all^C — побачити дерево

$ git log —graph —oneline —decorate —all  — побачити дерево

$ git push —set-upstream origin nameBranch — перший пуш новоствореної гілки;
або $ git push origin nameBranch — якщо не зробити як показано вище (але так треба буде завжди)
$ git push — запушити;

$ git merge finishBranch -m «merge finishBranch into develop»- мерж гілки finishBranch у (для прикладу) develop (для цього слід спочатку перейти на develop і вже потім ця команда) + створюємо коміт. Після мержу обов’язково пуш;

$ git status — побачити стан файлів;

$ git branch — побачити список локальних гілок і на якій гілці стоїш;
$ git branch -a — побачити список усіх гілок і на якій гілці стоїш;

$ git diff — побачити зміни від останньго коміту до моменту недоданих змін (не було $ git add…)*;
$ git diff —staged — побачити зміни між останнім комітом і доданими змінами (було $ git add…)* (побачити проіндексовані зміни);
* нічого не покаже, якщо після коміту не було змін;

$ git show хеш-коміта — побачити зміни у конкретному коміті

$ git rm nameFile — видалити файл (як з коміту, так і локально так і віддалено) + щоб видалити цей файл віддалено треба закомітити і пушнути ($ git add… не треба);
*якщо у файлі були зміни і файл додано через $ git add…, але ще не було $ git commit… — щоб його видалити (як локально так і віддалено) слід додати -f;
*щоб видалити файл лише віддалено, але залишити його локально і зробити цей файл невідслідковуваним — слід додати —cached;
*можна файл і видалити через (права клавіша миші) Delete… (після цього $ git commit… + $ git push, а $ git add… — не потрібно, бо індексація відбувається автоматично);

перейменувати
$ git mv oldName newName — перейменувати файл (після цього $ git commit… + $ git push, а $ git add… — не потрібно );
*або можна перейменувати через (права клавіша миші) refactor=>rename… (після цього $ git commit… + $ git push, а $ git add… — не потрібно );

$ git log — передивитись історію комітів;
$ git log -p — передивитись історію комітів + побачити зміни;
$ git log -p 5 — передивитись історію комітів + побачити зміни останніх 5-ти (для прикладу);
+ ще є декілька параметрів для фільтрації представлення комітів (по автору, даті, схемі гілок і тд.);

відміна
$ git reset HEAD filename — забрати документ із індекса;
$ git checkout filename — забрати всі зміни у файлі назавжди (після коміту або клону) (відкотити зміни у файлі до останнього коміту)(повернути видалений файл якщо не було коміту);
*$ git commit —amend — змінити останній комміт (забули додати файл чи додали зайвий файл);
*видає помилку Git
$ git commit —amend -m «new name of commit» — перейменувати останній коміт;
$ git commit —amend —no-edit — вклювити зміни в сотанній коміт (додали чи видалили файл і хочемо, щоб ці зміни були в останньому коміті);

забрати незакоментовані зміни
$ git stash — забере усе, що не було закомічено
$ git stash pop — вставить усе, що було забрано
$ git stash list — покаже усе, що забрали

спулити
$ git pull origin develop (стоїмо на feature-111)- спулить все з віддаленої гілки у локальну (в даном випадку — develop) і змерджить у feature-111 (можливий конфлікт);

отримати дані з репозитарія, яких не має локально
$ git fetch — додасть бранчі, але не змержить

відкотити
$ git checkout filename — відкотити зміни у файлі до сотаннього коміту;
$ git checkout хеш-коміту filename — відкотити зміни файлу до конкретного коміту;
$ git checkout хеш-коміту — відкотити зміни всіх файлів до конкретного коміту

Щоб підняти проект локально:
1) ств. папку на диску;
2) відкрити термінал і перейти у новостворену папку ($ cd…);
3)git clone і вставити (скопійований з репозиторія HTTP або SSH якщо є ключі) https://….
Нюанси:
комітити бажано вкінці таски, але можна і вкінці робочого дня;
пушити бажано як мінімум вкінці робочого дня;

проста методика для роботи з таскою
local develop:
$ git pull origin develop
$ git checkout -b name-new-branch

local name-new-branch:
$ git add .
$ git commit -m «first commit»
$ git push —set-upstream origin name-new-branch (не обов’язково)
$ git  git pull (якщо ти пушив у цю гілку віддалено з іншого компа або хтось інший це робив) (не завжди)
$ git checkout developer

local develop:
$ git pull origin develop
$ git merge —no-ff name-new-branch (мерж + автоматичний коміт)
$ git push

$ git branch -D  name-new-branch (видалення гілки локально)

FAQ
1) якщо створив гілку (відбився) чи слід відразу без коміта $ git push —set-upstream origin nameBranch або з комітом «created branchNew» чи це вкінці таски після останнього коміта перед пушом? (коміта відразу не потрібно і пушити відразу так або $ git push origin — треба якщо ше хтось буде на ній працювати !);
2) якщо я закомітив branchTask і збираюсь її мерджити із develop, чи потрібно перед цим її пушнути?(NO але бажано)
3) чи потрібен коміт, щоб у репозиторії відбулись зміни:
а) створив (відбився) гілку;
b) змерджив гілку (після пушу);
c) видалив файл (YES перед цим не потрібно $ git add…);
d) додав файл або зробив у ньому зміни (в обох випадках YES, бо одним $ git add… і $ git push — не обійдешся);
4) чому при клонуванні репозторію я отримую лише гілку master, а усі інші віддалені гвлки я бачу як origin/develop, при чому локальних їх прототипів у мене не має, їх потрібно створювати через $ git checkout -b develop origin/develop. А наприклад, склонувааши репозиторій сайту, я бачу гілку new-design і мені не потрібно створювати її локально (так ти її бачиш як origin/new-design,але якщо $ git checkout new-design — автоматично створиться і залишиться локальна new-design і ти на неї станеш, і від неї можна відбиватись !);
5) як спулити всі віддалені гілки і змержити в локальні? ($ git pull !);
6) чи правильним є створити локальну гілку (можливо тільки для фіксу, а не для таски), закомітити і змержити її із девелоп (для прикладу), після чого її удалити, не пушучи її у репозиторій? Але ми тоді не зможемо зробити Merge/Pull request ! (це дійсно правильно, якщо не потрібно для неї код рев’ю типу Merge/Pull request !);
7) чи можна використовувати можливість видаляти гілки з віддаленого репозиторії (якщо вони у Merge/Pull request)? Чи вадалятимуться вони так і локально? (так можна і вони не видалятимуться локально !);
8) як і чи можна створити автоматичний коміт «merge …»? (як варіант коли є виправити конфлікт, після цього $ git add . i $ git commit без назви, з’явиться повідомлення — ввести wq *error); (кінцева відповідь $ git merge —no-ff nameFeature !)(якщо при мержу виникне конфлікт, усунути його, проіндексувати файли і створити коміт типу «усунув конфлікт», як результат буде 2 коміти: 1) автоматичний про мерж та 2) про вирішення конфлікту)(ні, як результат буде один коміт 2) про вирішення конфлікту. Але якщо перед мержем зробити на цій гілці $ git pull origin develop і вирішити всі конфлікти, закомітити про це, а тоді пеерключитись на девелоп і зробити мерж з використаннням —no-ff — получиться гарно: перший коміт про конфлікт, а другий автоматичний — про мерж !)
9) $ git pull origin develop (поточна гілка — stage, відбита від develop) — спулиться гілка з віддаленого репозиторію (origin develop), у локальному репозиторії: не обновиться develop, а тільки змержиться у stage develop (можливий конфлікт);
10) при завершенні таски (or fix) на гілці, можливо, краще зробити мерж девелопа у ній (щоб вирішити всі конфлікти) або зробити git pull origin develop, і вже після цього переключитись на девелоп і там змержити цю гілку? (краще перед мержом зробити на ній $ git pull origin develop і поправити конфлікти, після чого перейти на девелоп і там її змержити !); а може потім $ git  push або взагалі будучи на fix — git push origin develop

10/a) на гілці fix — $ git pull (можливо були зміни здому), перекл. на девелоп — $ git pull, $ git merge fix, $ git push;
11) утиліти для вирішення конфліктів при мержі.
12) на гілці а є директорія dist, що ігнориться.У ній з’явився новий файл file.js. у нас все закомічено, ми перекл. на гілку b, у якій папка dist відслідковується. Не роблячи змін при $git status ми бачимо, що цей file.js є як антракед. Додаємо цю папку у git .gitignore, $git add .gitignore; $git commit -m… Проте, ми всеодно бачимо цей file.js на цій гілці. Чому?
12/a) якщо у нас папка dist не відслідковується, а у ній є збілдиний файл js і css, які підключені до кожного html-файла. Як тоді будуть братись зміни на проду? (там спрацює сервер !)
13) git checkout 003; git reset —hard 003 (все, що після 003 пропаде)
