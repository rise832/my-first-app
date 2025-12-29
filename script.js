// ローカルストレージ
const storage = localStorage;

// リストの内容
let TodoList = [];

// ページを開いたときに保存されているストレージの内容を取得
const storageData = JSON.parse(storage.getItem('TodoList'));
storageData?.forEach((list) => {
    TodoList.push({ planText:list.planText, limitDate:list.limitDate });
});

// TodoListの状態を描画
function listView() {
    const listBoard = document.querySelector('#listBoard');
    listBoard.innerHTML = '';
    TodoList.forEach((list, index) => {
        listBoard.insertAdjacentHTML('beforeend',`<label><input type="checkbox" data-index="${index}" class="checkbox">【予定】${list.planText}      【期日】${list.limitDate}<br></label>`);
    });
};

listView();

// 予定の追加
document.querySelector('#addList').addEventListener('click', () => {
    const plan = document.querySelector('#plan');
    const limit = document.querySelector('#limit');
    const error = document.querySelector('#error');
    if (plan.value === "" || limit.value === "") {
        error.textContent = "予定と期日を入力してください";
    } else {
        TodoList.push({ planText:plan.value, limitDate:limit.value });
        listView();
        storage.setItem('TodoList', JSON.stringify(TodoList));
        plan.value = "";
        limit.value = "";
        error.textContent = "";
    }
});

// 予定の削除
document.querySelector('#delete').addEventListener('click', () => {
    const checkBoxes = document.querySelectorAll('input[type="checkbox"]:checked');
    // チェックボックスにチェックが入っているdata-indexの値の取得
    const deleteList = [...checkBoxes].map(check => Number(check.dataset.index));
    // チェックが入っているdata-indexの値とTodoListのインデックスが一致したものを探す
    TodoList = TodoList.filter((_, index) => !deleteList.includes(index));
    // TodoListを編集　=>の右は新しい配列に入れたいもの
    // includesはtrueを返してしまう　一致したものは新しい配列に含めないように　逆にしたい　！で
    listView();
    // ストレージの内容を更新　TodoListの内容で上書きしていいはず
    storage.setItem('TodoList', JSON.stringify(TodoList));
});





















/*================================================================================================================
以下　失敗コードとか勉強した部分
後から振り返るために残す
１回目

const todoList = [];
const storage = localStorage;

const storageList = JSON.parse(storage.getItem('todoList'));

storageList?.forEach((storageData) => {
    todoList.push({text:storageData.text, date:storageData.date})
    const listBoard = document.querySelector('#listBoard');
//    listBoard.insertAdjacentHTML('afterbegin',`<label><input type="checkbox" id="lists">【予定】${storageData.text}      【期日】${storageData.date}<br></label>`);
    listBoard.insertAdjacentHTML('afterbegin',`<li id="lists">【予定】${storageData.text}      【期日】${storageData.date}<br></li>`);

});

document.querySelector('#addList').addEventListener('click', () => {
    const todoPlan = document.querySelector('#text');
    const todoLimit = document.querySelector('#date');
    const error = document.querySelector('#error');
    const listBoard = document.querySelector('#listBoard');
    if (todoPlan.value === "" || todoLimit.value === "") {
        error.textContent = "予定と日付を入力してください";
    } else {
        todoList.push({text:todoPlan.value, date:todoLimit.value});
        storage.setItem('todoList',JSON.stringify(todoList));
//        listBoard.insertAdjacentHTML('afterbegin',`<label><input type="checkbox" id="lists">【予定】${todoPlan.value}      【期日】${todoLimit.value}<br></label>`);
        listBoard.insertAdjacentHTML('afterbegin',`<li id="lists">【予定】${todoPlan.value}      【期日】${todoLimit.value}<br></li>`);
        todoPlan.value = "";
        todoLimit.value = "";
        error.textContent = "";
//        console.log(todoList);
    }
});

document.querySelector('#delete').addEventListener('click', () => {
    storage.clear();
    const lists = document.querySelectorAll('#lists');
    lists.forEach((list) => {
        list.remove();
    });
});      



// いや、配列で管理しなきゃ消せないやん‥‥。
// document.querySelector('#delete').addEventListener('click', () => {
//     const lists = document.querySelectorAll('#lists');
//     lists.forEach((list) => {
//         if (list.checked === true) {
//             list.closest('label').remove();
//         }        
//     })
// })


やりたかったこと
配列に入れたものを画面表示してチェックボックスにチェックを入れ削除ボタンを押すとチェックされたものだけ削除　ストレージと連動


つくりなおし
==================================================================================================================*/


/*=================================================================================================================
２回目

let TodoList = [];
const storage = localStorage;
storage.clear();
// ストレージを読み込んでデータを入手
const storageData = JSON.parse(storage.getItem('TodoList'));
// 配列に追加
storageData?.forEach((list) => {
    TodoList.push( { planText:list.planText, limitDate:list.limitDate } );
})

// 配列の状態を画面表示
function listView() {
    const listBoard = document.querySelector('#listBoard');
    const checkbox = document.querySelectorAll('.checkbox');
    checkbox?.forEach((check) => {
        check.closest('label').remove();
    })
    TodoList.forEach((list, index) => {
        listBoard.insertAdjacentHTML('beforeend',`<label><input type="checkbox" name="check${index}" class="checkbox">【予定】${list.planText}      【期日】${list.limitDate}<br></label>`);
    });
};

listView();

document.querySelector('#addList').addEventListener('click', () => {
    const plan = document.querySelector('#plan');
    const limit = document.querySelector('#limit');
    const error = document.querySelector('#error');
    if (plan.value === "" || limit.value === "") {
        error.textContent = "予定と期限を入力してください";
    } else {
        TodoList.push({ planText:plan.value, limitDate:limit.value });
        listView();
        storage.setItem('TodoList', JSON.stringify(TodoList));
        plan.value = "";
        limit.value = "";
        error.textContent = "";
    }
});
    
document.querySelector('#delete').addEventListener('click', () => {
    const checkbox = document.querySelectorAll('.checkbox');
    TodoList = TodoList.filter((value, index) => {
        if (checkbox[index].checked) {
            checkbox[index].closest('label').remove();
//            return false;
        }
//        return true;
    });
    listView();
    // const list = JSON.parse(storage.getItem('TodoList'));
    // const newStorageData = (list.filter(TodoList => TodoList.planText === list.planText && TodoList.limitDate === list.limitDate));
    // storage.setItem('TodoList', JSON.stringify(newStorageData));
});



削除するとき配列と画面表示が連動しない
配列を扱うメソッドの理解が足りていない
条件式の書き方にもっと慣れるべき
そもそもの設計から見直したほうが良さそう

つくりなおし
=======================================================================================================================*/


/*
チェックボックスと配列を連動させる部分だけ練習
チェックボックスをチェックしたら配列の内容を取得し、削除ボタンを押すと配列の内容も消える
自分で考えた限界　動作不安定だし、いろいろ問題孕んでいることは理解　改良された書き方が分からないからGPT先生に聞く


<!DOCTYPE html>
<html lang ="ja">
    <head>
        <meta charset = "UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>いろいろ試してみよう</title>
        <link rel="stylesheet" href="style.css">
        <script src="script.js" defer></script>
    </head>
    <body>
        <h2>JavaScript</h2>
        <h3>　リスト</h3>
        <button type="button" id="delete">削除</button><br>
        <div id="listBoard">
            <label><input type="checkbox" id="number_0" class="checkbox">【予定】テスト０      【期日】2025-12-10<br></label>
            <label><input type="checkbox" id="number_1" class="checkbox">【予定】テスト１      【期日】2025-12-15<br></label>
            <label><input type="checkbox" id="number_2" class="checkbox">【予定】テスト２      【期日】2025-12-20<br></label>
            <label><input type="checkbox" id="number_3" class="checkbox">【予定】テスト３      【期日】2025-12-25<br></label>

        </div>
    </body>
    </html>



console.log(TodoList);
for (let i = 0; i < TodoList.length; i++) {
    const planList = document.querySelectorAll(`#number_${i}`);
    planList.forEach((plan) => {
        plan.addEventListener('change', (e) => {
            if(e.target.checked) {
                document.querySelector('#delete').addEventListener('click', () => {
                    plan.closest('label').remove();
                    TodoList.splice(i, 1);
                    listView();
                    console.log(TodoList);
                })
            }
        })       
    })
};
=================================================================================================================*/

/*
GPT先生に上のコードを元に改良を求めて、出されたのがこれ
画面再描画の処理は自分で考えて付け足し
〇htmlに　data-index　を付けている　これで管理しやすくなっている
    id管理じゃなくなったから一番外側のforがいらなくなった
〇チェックされた状態のチェックボックスをひとまとめに
    plan.addEventListenerがいらなくなった　イベントリスナー不使用　すっきり見通しが良くなった
〇spliceをfilterに置き換えている
    spliceなど破壊的メソッドはあまり使うべきではない
ただしこれも問題がある
削除ボタンが押されたときに、チェックがついているものの数だけfilterと再描画処理がされてしまう
チェック数が増えると不安定になって正しく動作しない


function listView() {
    const listBoard = document.querySelector('#listBoard');
    const checkbox = document.querySelectorAll('.checkbox');
    checkbox?.forEach((check) => {
        check.closest('label').remove();
    })
    TodoList.forEach((list, index) => {
        listBoard.insertAdjacentHTML('beforeend',`<label><input type="checkbox" data-index="${index}" class="checkbox">【予定】${list.planText}      【期日】${list.limitDate}<br></label>`);
    });
};

console.log(TodoList);
document.querySelector('#delete').addEventListener('click', () => {
    const checkedLabels = document.querySelectorAll('input[type="checkbox"]:checked');
        // 'input[type="checkbox"]:checked'　はCSSの疑似クラスセレクターを利用した要素の集め方
    checkedLabels.forEach((checkbox) => {   
        // 削除ボタンがクリックされたらその時点でチェックされている要素に対してforEachが回る
        // 要素1つずつに対してforEach以下の処理がなされるからずれてしまう　これが問題
        // プログラミングにおいて、状態（配列・DOM）を書き換える処理は「まとめて1回」
        // ループは「情報収集」にだけ使うようにする
        checkbox.closest('label').remove();
        // 1⃣要素を削除する
        const index = Number(checkbox.dataset.index);
        TodoList = TodoList.filter((_, i) => i !== index);
        // 2⃣data-indexは表示上の配列とみなす　作るときに上から順に配列インデックスと同じ番号を与えている
        // 削除して残った要素のdata-indexと配列のインデックスが一致したものを新しい配列にする　filterを通してTodoListを再編集
        listView();
        // 3⃣再編集されたTodoListを元に画面を再描画
        console.log(TodoList);
    });

});
=================================================================================================================*/

/*
さらに改良されたものとして出されたのがこれ
これをもとに勉強する　各処理ちゃんと理解して見ずに書くことができるようになればOK

function listView() {
    const listBoard = document.querySelector('#listBoard');
    listBoard.innerHTML = '';
    // 子要素をまとめて消したいときはこの記述で問題ない
    TodoList.forEach((list, index) => {
        listBoard.insertAdjacentHTML('beforeend',`<label><input type="checkbox" data-index="${index}" class="checkbox">【予定】${list.planText}     【期日】${list.limitDate}<br></label>`
        );
    });
}

document.querySelector('#delete').addEventListener('click', () => {
    // 削除ボタンがクリックされたら
    const checkedBoxes = document.querySelectorAll('input[type="checkbox"]:checked');
    // 1⃣チェックされた状態の要素をすべて集める
    const deleteIndexes = [...checkedBoxes].map(cb => Number(cb.dataset.index));
    // なにこれ・・・？
    // 2⃣チェックされた状態の要素のdata-indexの値だけを集めて配列に入れる　要素ではなくdata-indexの値
        // checkBoxesはノードリストだからarrayメソッドは使えない
        // スプレッド構文にして配列として扱う
        // data-indexの値は文字列として取得されるから数字にしたかったらNumberが必要
    TodoList = TodoList.filter((_, index) => !deleteIndexes.includes(index));
    // どういう意味・・・
    // 3⃣includesは２で集めた配列の中を確認してTodoListのインデックスと同じ番号のものにtrueを返す
    //　filter処理　普通は=>の右側は新しい配列に加える条件だけど、！がついているから新しい配列に入れない条件になっている
    // ！は式がfalseの場合はtrue　逆を返す　includesはtrueを返すからこの条件式だとfalseになる＝新しい配列に入れない
    // チェックされた状態のdata-indexと同じインデックスの値のものは新しいTodoListに入れてあげない　ということ
    listView();
    console.log(TodoList);
});
=================================================================================================================*/