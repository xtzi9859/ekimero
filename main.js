$(function(){
    // ドロップダウンリスト初期値選択
    $('#melodyFile').val('nonSelected');
    $('#doorFile').val('nonSelected');
    $('#trackNum').val('nonSelected');
    // 初期化
    var door = $('#door').get(0);
    var melody = $('#melody').get(0);
    var repeat = $('#repeat').get(0);
    var volume = 1.0;
    var doorPlaying = false;
    var doorPath = 'nonSelected';
    var melodyPath = 'nonSelected';
    var doorType = 'nonSelected';
    // メロディー
    $('#melodyFile').change(function(){
        melodyPath = $('#melodyFile').val();
        $('#melody').attr('src', melodyPath);
        $('#repeat').attr('src', melodyPath)
    });
    // 放送選択,発着番線のリスト切り替え
    $('#doorFile').change(function(){
        doorType = $('#doorFile').val();
        switch(doorType) {
            case 'no':
                doorPath = '';
                clearTrackSlecter();
                addTrackSelecter('','なし');
                break;
            case 'UENO_MATSUMOTO':
                clearTrackSlecter();
                addTrackSelecter('./door/matsumoto/1.aac','1番線');
                addTrackSelecter('./door/matsumoto/2.aac','2番線');
                addTrackSelecter('./door/matsumoto/3.aac','3番線');
                addTrackSelecter('./door/matsumoto/4.aac','4番線');
                addTrackSelecter('./door/matsumoto/5.aac','5番線');
                addTrackSelecter('./door/matsumoto/6.aac','6番線');
                break;
            case 'ATOS':
                clearTrackSlecter();
                addTrackSelecter('./door/atos/normal/1.aac','1番線');
                addTrackSelecter('./door/atos/normal/2.aac','2番線');
                addTrackSelecter('./door/atos/normal/3.aac','3番線');
                addTrackSelecter('./door/atos/normal/4.aac','4番線');
                addTrackSelecter('./door/atos/normal/5.aac','5番線');
                addTrackSelecter('./door/atos/normal/6.aac','6番線');
                break;
            case 'ATOS_line':
                clearTrackSlecter();
                $('#trackNum').append('<option value="yamanoteLine" disabled>山手線</option>');
                addTrackSelecter('./door/atos/yamanote/0.aac','山手線 番線なし');
                addTrackSelecter('./door/atos/yamanote/1.aac','山手線 1番線');
                addTrackSelecter('./door/atos/yamanote/2.aac','山手線 2番線');
                addTrackSelecter('./door/atos/yamanote/3.aac','山手線 3番線');
                addTrackSelecter('./door/atos/yamanote/4.aac','山手線 4番線');
                $('#trackNum').append('<option value="kehin-tohokuLine" disabled>京浜東北線</option>');
                addTrackSelecter('./door/atos/kehin-tohoku/0.aac','京浜東北線 番線なし');
                addTrackSelecter('./door/atos/kehin-tohoku/1.aac','京浜東北線 1番線');
                addTrackSelecter('./door/atos/kehin-tohoku/2.aac','京浜東北線 2番線');
                addTrackSelecter('./door/atos/kehin-tohoku/3.aac','京浜東北線 3番線');
                addTrackSelecter('./door/atos/kehin-tohoku/4.aac','京浜東北線 4番線');
                break;
            case 'COSMOS_elder':
                clearTrackSlecter();
                addTrackSelecter('./door/cosmos/sendai.aac','仙台駅12番線 やまびこ167 盛岡行き');
                addTrackSelecter('./door/cosmos/nagano.aac','長野駅12番線 かがやき504 東京行き')
                break;
            case 'KEIYO_PRC':
                clearTrackSlecter();
                addTrackSelecter('./door/keiyo/1.aac','1番線');
                addTrackSelecter('./door/keiyo/2F.aac','2番線 女声');
                addTrackSelecter('./door/keiyo/2M.aac','2番線 男声');
                addTrackSelecter('./door/keiyo/3.aac','3番線');
                addTrackSelecter('./door/keiyo/4.aac','4番線');
                break;
            case 'TOBU_new':
                clearTrackSlecter();
                addTrackSelecter('./door/tobu/F.aac','番線なし 女声');
                addTrackSelecter('./door/tobu/M.aac','番線なし 男声');
                addTrackSelecter('./door/tobu/M1.aac','1番線');
                addTrackSelecter('./door/tobu/F2.aac','2番線');
                break;
            case 'SENSEKI':
                clearTrackSlecter();
                addTrackSelecter('./door/仙石型 女声.aac','女声');
                addTrackSelecter('./door/仙石型 男声.aac','男声');
                break;
            case 'TOKAIDO':
                clearTrackSlecter();
                addTrackSelecter('./door/東海道型 女声.aac','女声');
                addTrackSelecter('./door/東海道型 男声.aac','男声');
                break;
        }
    })
    // 番線リセットの関数
    function clearTrackSlecter() {
        let optionCount = $('#trackNum').children('option').length;
        for(let n = 1; n <= optionCount ; n++) {$('#trackNum').children('option:nth-child(1)').remove();}
        $('#trackNum').append('<option value="nonSelected" selected disabled>発着番線</option>');
        $('#trackNum').val('nonSelected');
    }
    // 番線選択の関数
    function addTrackSelecter(a, b){
        $('#trackNum').append($('<option>').val(a).text(b));
    }
    // 放送ファイルを再生
    $('#trackNum').change(function(){
        doorPath = $('#trackNum').val();
        $('#door').attr('src', doorPath);
    })
    // カテゴリージャンプ
    $('#selectJRSH').click(function(){$('#melodyFile').val('JR-SH')})
    // ON/OFF 0.5秒間を置いてリピート
    $('#on').click(function(){
        repeat.play();
    });
    // 0.5秒後に放送
    $('#off').click(function(){
        repeat.pause();
        repeat.currentTime = 0;
        setTimeout(function(){door.play()}, 500);
    });
    // 一回鳴らす
    // 2.5秒後に音量ダウン
    // 3.0秒後に放送開始
    // 放送終了後0.5秒で音量戻す
    $('#playOnce').click(function(){
        melody.volume = 1.0
        melody.play();
        if(doorPath!='no'&&doorPath!='nonSelected'){
            doorPlaying = true;
            setTimeout(function(){melody.volume = (volume * 0.4);}, 2500);
            setTimeout(function(){
                door.play();
            }, 3000);
        }
        // 放送が流れていればリピート
        $('#door').on('ended', function(){
            doorPlaying = false;
            setTimeout(function(){melody.volume = volume;}, 500);
        });
        $('#melody').on('ended', function(){if(doorPlaying == true){melody.play();};});
    });
    // 試聴ボタン
    $('#listenMelody').click(function(){melody.play();});
    $('#listenDoor').click(function(){door.play();});
    //強制停止 リピートキャンセル
    $('#forceStop').click(function(){
        melody.pause();
        door.pause();
        repeat.pause;
        melody.currentTime = 0;
        door.currentTime = 0;
        repeat.currentTime = 0;
        melody.volume = volume;
        doorPlaying = false;
    });
    // 音量調節
    $('#volume').on('input', function(){
        let slider = $(this).val();
        volume = slider / 20;
        $('#volumeValue').val(volume * 100);
        melody.volume = volume;
        door.volume = volume;
        repeat.volume = volume;
    })
});
