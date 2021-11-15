// DOMの読み込みが終わったらfunction()の中の処理を実行します。
$(document).ready(function () {
    // 「国語、英語、数学、理科、社会」の点数（入力値）を取得して合計点と平均点を出すロジック
    function get_pointArray() {
        // 変数「subject_points」に「国語、英語、数学、理科、社会」の点数の配列を代入します。
        let subject_points = [Number($('#national_language').val()),
        Number($('#english').val()),
        Number($('#mathematics').val()),
        Number($('#science').val()),
        Number($('#society').val())
        ];

        return subject_points;
    };

    function get_sumPoints() {
        let sumPoints = 0;
        let subject_points = get_pointArray();

        for (let i = 0; i < subject_points.length; i++) {
            sumPoints += subject_points[i];
        }

        return sumPoints;
    };

    function get_averagePoints() {
        let sumPoints = get_sumPoints();
        let averagePoints = sumPoints / get_pointArray().length;

        return averagePoints;
    };

    // 平均点数を取得し、取得した平均点数から「A、B、C、D」にランク分けするロジックを記述する。
    function get_achievement() {
        // 変数「averageIndicate」に
        // 平均点数をHTML上のid="average_indicate"から取得して代入します。
        let averagePoints = get_averagePoints();
        // もし「averageIndicate」が80以上なら"A"を返します。
        if (averagePoints >= 80) {
            return "A";
        } else if (averagePoints >= 60) {
            return "B";
        } else if (averagePoints >= 40) {
            return "C";
        } else {
            return "D";
        }
        // もし「averageIndicate」が60以上なら"B"を返します。
        // もし「averageIndicate」が40以上なら"C"を返します。
        // もし「averageIndicate」がそれ以外なら"D"を返します。
    };
    // 各教科の点数を取得し、取得した点数から「合格、不合格」の判断を下すロジックを作ります。
    function get_pass_or_failure() {
        let subject_points = get_pointArray();
        // 変数「number」に入力した教科の数を代入します。
        let subjectNumber = subject_points.length;
        // 変数「judge」に"合格"を代入しておきます。
        let judge = "合格";
        // 入力したそれぞれの教科のうち、1つでも60点よりも低い点数があった場合、変数「judge」に"不合格"を再代入する処理を記述する。
        // ヒント：配列の繰り返し処理について調べてみましょう。
        for (let i = 0; i < subjectNumber; i++ ) {
            if (subject_points[i] < 60) {
                judge = "不合格";
            }
        }
        return judge;
    };
    // 最終的なジャッジのロジックを作ります。
    function judgement() {
        // 変数「achievement」に「get_achievement()の戻り値」を代入します。
        let achievement = get_achievement();
        // 変数「pass_or_failure」に「get_pass_or_failure()の戻り値」を代入します。
        let pass_or_failure = get_pass_or_failure();
        // 「最終ジャッジ」(id="alert-indicate)ボタンを押したら「あなたの成績は${achievement}です。${pass_or_failure}です。」が出力される処理です。
        $('#declaration').append(`<label id="alert-indicate" class="alert alert-info">あなたの成績は${achievement}です。${pass_or_failure}です。</label>`);
    };
    // [国語の点数,英語の点数,数学の点数,理科の点数,社会の点数]のいずれかの点数が変更された際に「function score_indicate()」を発火させる処理です。
    $('#national_language, #english, #mathematics, #science, #society').change(function () {
        $("#sum_indicate").text(get_sumPoints());
        $("#average_indicate").text(get_averagePoints());
    });
    // 「ランク」(id="evaluation")ボタンを押したら「get_achievement()」が出力される処理です。
    $('#btn-evaluation').click(function () {
        $("#evaluation").text(get_achievement());
    });
    // 「判定」(id="btn-judge")ボタンを押したら「function et_pass_or_failure()」が出力される処理です。
    $('#btn-judge').click(function () {
        $("#judge").text(get_pass_or_failure());
    });
    // 「最終ジャッジ」(id="btn-declaration")ボタンが押された際、「function judgement()」の処理を実行させる。
    // ２回目以降に「最終ジャッジ」ボタンを押した際は、それまでに表示していたジャッジのHTML要素を削除して、新たなジャッジのHTML要素を追加する。
    // ヒント：removeメソッドについて調べてみましょう。
    $('#btn-declaration').on('click', function() {
        $('#alert-indicate').remove();
        judgement();
    })
});