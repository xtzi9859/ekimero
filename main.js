$(function(){
    var door = $('#door').get(0);
    var melody = $('#melody').get(0);
    var repeat = $('#repeat').get(0);
    var silent = $('#silent').get(0);
    var sw1 = $('#sw1').get(0);
    var sw2 = $('#sw2').get(0);
    var melodyPath = 'nonSelected';
    var doorPath = 'nonSelected';
    var doorType = 'nonSelected';
    var doorPlaying = false;
    var volume = 1.0;
    var rp = 0;
    var timeout1;
    var timeout2;
    var timeout3;
    var timeout4;
    var timeout5;
    var melodyTimeout;
    $('#volume').val(20);
    $('#volumeValue').val(100);
    $('#melodyFile').val('nonSelected');
    $('#doorFile').val('nonSelected');
    $('#trackNum').val('nonSelected');

    $('#repeat').on('ended', function(){silent.play();});
    $('#silent').on('ended', function(){repeat.play();});

    // ON/OFF
    $('#on').click(function(){
        sw2.play();
        melodyTimeout = setTimeout(function(){repeat.play();}, 500);
    })
    $('#off').click(function(){
        sw2.play();
        setTimeout(function(){repeat.pause(); repeat.currentTime = 0;}, 500);
        setTimeout(function(){silent.pause(); silent.currentTime = 0;}, 500);
        setTimeout(function(){door.play();}, 1200);
    })
    // メロディーボタン
    // メロディーは放送が鳴っている間に限って1回だけリピート可
    $('#playOnce').click(function(){
        sw1.play();
        rp = 0;
        setTimeout(function(){melody.play();},500);
        if(doorPath!='nonSelected'&&doorPath!='no'){
            timeout1 = setTimeout(function(){melody.volume = (volume * 0.4);}, 5000);
            timeout2 = setTimeout(function(){$('#volumeValue').val('❌');}, 5000);
            timeout3 = setTimeout(function(){$('#volume').prop('disabled', true);}, 5000);
            timeout4 = setTimeout(function(){door.play();}, 5500);
            timeout5 = setTimeout(function(){doorPlaying = true;}, 5500);
        }
        $('#melody').on('ended', function(){
            if(rp < 1 && doorPlaying == true){
                melody.play();
            }
            rp = 1;
        });
        $('#door').on('ended', function(){
            doorPlaying = false;
            setTimeout(function(){melody.volume = volume;}, 500);
            setTimeout(function(){$('#volumeValue').val(volume * 100);}, 500);
            setTimeout(function(){$('#volume').prop('disabled', false);}, 500);
        });
    });


    // メロディー選択
    $('#melodyFile').change(function(){
        melodyPath = $('#melodyFile').val();
        $('#melody').attr('src', melodyPath);
        $('#repeat').attr('src', melodyPath);
    })
    // カテゴリー
    $('#melodyCategory').change(function(){
        category = $('#melodyCategory').val();
        switch(category) {
            case 'all':
                $('.opt_hide').contents().unwrap();
            break;
            case 'shinkansen':
                $('.opt_hide').contents().unwrap();
                $('#melodyFile > :not(#shinkansen) > option').wrap('<span class="opt_hide"></span>');
            break;
            case 'WaterCrown':
                $('.opt_hide').contents().unwrap();
                $('#melodyFile > :not(#WaterCrown) > option').wrap('<span class="opt_hide"></span>');
            break;
            case 'JRSH':
                $('.opt_hide').contents().unwrap();
                $('#melodyFile > :not(#JRSH) > option').wrap('<span class="opt_hide"></span>');
            break;
        }
    });
    // 放送選択,発着番線のリスト切り替え
    $('#doorFile').change(function(){
        doorType = $('#doorFile').val();
        switch(doorType) {
            case 'no':
                clearTrackSlecter();
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
            case 'ATOS_sakiyama':
                clearTrackSlecter();
                addTrackSelecter('./door/atos/kaiso.aac','回送')
                addTrackSelecter('./door/atos/sakiyama/1.aac','1番線');
                addTrackSelecter('./door/atos/sakiyama/2.aac','2番線');
                addTrackSelecter('./door/atos/sakiyama/3.aac','3番線');
                addTrackSelecter('./door/atos/sakiyama/4.aac','4番線');
                addTrackSelecter('./door/atos/sakiyama/5.aac','5番線');
                addTrackSelecter('./door/atos/sakiyama/6.aac','6番線');
                addTrackSelecter('./door/atos/sakiyama/7.aac','7番線');
                addTrackSelecter('./door/atos/sakiyama/8.aac','8番線');
                addTrackSelecter('./door/atos/sakiyama/9.aac','9番線');
                addTrackSelecter('./door/atos/sakiyama/10.aac','10番線');
                addTrackSelecter('./door/atos/sakiyama/11.aac','11番線');
                addTrackSelecter('./door/atos/sakiyama/12.aac','12番線');
                addTrackSelecter('./door/atos/sakiyama/13.aac','13番線');
                addTrackSelecter('./door/atos/sakiyama/14.aac','14番線');
                addTrackSelecter('./door/atos/sakiyama/15.aac','15番線');
                addTrackSelecter('./door/atos/sakiyama/16.aac','16番線');
                break;
            case 'ATOS_tanaka':
                clearTrackSlecter();
                addTrackSelecter('./door/atos/tanaka/1.aac','1番線');
                addTrackSelecter('./door/atos/tanaka/2.aac','2番線');
                addTrackSelecter('./door/atos/tanaka/3.aac','3番線');
                addTrackSelecter('./door/atos/tanaka/4.aac','4番線');
                break;
            case 'ATOS_tsuda':
                clearTrackSlecter();
                addTrackSelecter('./door/atos/tsuda/1.aac','1番線');
                addTrackSelecter('./door/atos/tsuda/2.aac','2番線');
                addTrackSelecter('./door/atos/tsuda/3.aac','3番線');
                addTrackSelecter('./door/atos/tsuda/4.aac','4番線');
                addTrackSelecter('./door/atos/tsuda/5.aac','5番線');
                addTrackSelecter('./door/atos/tsuda/6.aac','6番線');
                addTrackSelecter('./door/atos/tsuda/7.aac','7番線');
                addTrackSelecter('./door/atos/tsuda/8.aac','8番線');
                addTrackSelecter('./door/atos/tsuda/9.aac','9番線');
                addTrackSelecter('./door/atos/tsuda/10.aac','10番線');
                addTrackSelecter('./door/atos/tsuda/11.aac','11番線');
                addTrackSelecter('./door/atos/tsuda/12.aac','12番線');
                break;
            case 'ATOS_lineF':
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
                addTrackSelecter('./door/sensekiF.aac','女声');
                addTrackSelecter('./door/sensekiM.aac','男声');
                break;
            case 'TOKAIDO':
                clearTrackSlecter();
                addTrackSelecter('./door/tokaidoF.aac','女声');
                addTrackSelecter('./door/tokaidoM.aac','男声');
                break;
            case 'IWANE':
                clearTrackSlecter();
                addTrackSelecter('./door/iwaneF.aac','女声');
                addTrackSelecter('./door/iwaneM.aac','男声');
                break;
        }
    })
    $('#trackNum').change(function(){
        doorPath = $('#trackNum').val();
        $('#door').attr('src', doorPath);
    })
    // 番線リストの関数
    function clearTrackSlecter() {
        let optionCount = $('#trackNum').children('option').length;
        for(let n = 1; n <= optionCount ; n++) {$('#trackNum').children('option:nth-child(1)').remove();}
        $('#trackNum').append('<option value="nonSelected" selected disabled>発着番線</option>');
        $('#trackNum').val('nonSelected');
        $('#door').attr('src', 'no');
        doorType = 'nonSelected';
        doorPath = 'nonSelected';
    }
    function addTrackSelecter(a, b){
        $('#trackNum').append($('<option>').val(a).text(b));
    }

    // 強制停止
    $('#forceStop').click(function(){
        melody.pause();
        repeat.pause();
        door.pause();
        silent.pause();
        melody.currentTime = 0;
        repeat.currentTime = 0;
        door.currentTime = 0;
        silent.currentTime = 0;
        melody.volume = volume;
        repeat.volume = volume;
        door.volume = volume;
        doorPlaying = false;
        $('#volume').prop('disabled', false);
        $('#volumeValue').val(volume * 100);
        clearTimeout(timeout1);
        clearTimeout(timeout2);
        clearTimeout(timeout3);
        clearTimeout(timeout4);
        clearTimeout(timeout5);
        clearTimeout(melodyTimeout);
    })

    // 試聴
    $('#listenMelody').click(function(){melody.play()});
    $('#listenDoor').click(function(){door.play()});

    // 音量
    $('#volume').on('input', function(){
        let slider = $(this).val();
        volume = slider / 20;
        melody.volume = volume;
        repeat.volume = volume;
        door.volume = volume;
        sw1.volume = volume;
        sw2.volume = volume;
        $('#volumeValue').val(slider * 5);
    })
})
