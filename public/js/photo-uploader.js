(function () {
  'use strict';

  function createUploaderUI() {
    if (document.getElementById('photo-uploader-dialog')) return;

    var style = document.createElement('style');
    style.textContent = [
      '#photo-uploader-dialog {',
      '  position: fixed;',
      '  inset: 0;',
      '  z-index: 99999;',
      '  background: rgba(0, 0, 0, 0.78);',
      '  backdrop-filter: blur(14px);',
      '  display: none;',
      '  align-items: center;',
      '  justify-content: center;',
      '  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", sans-serif;',
      '}',
      '#photo-uploader-dialog.open { display: flex; }',
      '.photo-dialog-box {',
      '  background: #121216;',
      '  border: 1px solid rgba(255, 255, 255, 0.16);',
      '  border-radius: 16px;',
      '  width: min(92vw, 460px);',
      '  padding: 1.8rem;',
      '  box-shadow: 0 24px 70px rgba(0,0,0,0.85);',
      '  color: #fff;',
      '  text-align: center;',
      '}',
      '.photo-dialog-title {',
      '  font-size: 1.15rem;',
      '  font-weight: 600;',
      '  margin-bottom: 0.4rem;',
      '  letter-spacing: -0.01em;',
      '}',
      '.photo-dialog-sub {',
      '  font-size: 0.82rem;',
      '  color: rgba(255, 255, 255, 0.55);',
      '  margin-bottom: 1.2rem;',
      '  line-height: 1.5;',
      '}',
      '.photo-dialog-preview {',
      '  width: 140px;',
      '  height: 175px;',
      '  object-fit: cover;',
      '  border-radius: 8px;',
      '  border: 1px solid rgba(255, 255, 255, 0.2);',
      '  margin: 0 auto 1.3rem auto;',
      '  display: block;',
      '}',
      '.photo-dialog-actions {',
      '  display: grid;',
      '  grid-template-columns: 1fr 1fr;',
      '  gap: 0.65rem;',
      '  margin-bottom: 1rem;',
      '}',
      '.photo-slot-btn {',
      '  background: rgba(255, 255, 255, 0.06);',
      '  border: 1px solid rgba(255, 255, 255, 0.18);',
      '  color: #fff;',
      '  padding: 0.75rem 0.6rem;',
      '  border-radius: 8px;',
      '  font-size: 0.85rem;',
      '  cursor: pointer;',
      '  transition: all 0.2s;',
      '}',
      '.photo-slot-btn:hover {',
      '  background: rgba(255, 255, 255, 0.16);',
      '  border-color: rgba(255, 255, 255, 0.45);',
      '}',
      '.photo-slot-btn.highlight {',
      '  background: #3b82f6;',
      '  border-color: #60a5fa;',
      '  color: #fff;',
      '}',
      '.photo-dialog-foot {',
      '  display: flex;',
      '  align-items: center;',
      '  justify-content: space-between;',
      '  margin-top: 0.8rem;',
      '  padding-top: 0.8rem;',
      '  border-top: 1px solid rgba(255,255,255,0.08);',
      '}',
      '.photo-pick-more-btn {',
      '  background: transparent;',
      '  border: 1px solid rgba(255,255,255,0.2);',
      '  color: rgba(255,255,255,0.8);',
      '  border-radius: 6px;',
      '  font-size: 0.78rem;',
      '  cursor: pointer;',
      '  padding: 0.35rem 0.7rem;',
      '  transition: all 0.2s;',
      '}',
      '.photo-pick-more-btn:hover {',
      '  background: rgba(255,255,255,0.1);',
      '  color: #fff;',
      '}',
      '.photo-cancel-btn {',
      '  background: transparent;',
      '  border: none;',
      '  color: rgba(255, 255, 255, 0.45);',
      '  font-size: 0.8rem;',
      '  cursor: pointer;',
      '  padding: 0.4rem;',
      '}',
      '.photo-cancel-btn:hover { color: #fff; }',
      '.photo-toast {',
      '  position: fixed;',
      '  bottom: 2rem;',
      '  left: 50%;',
      '  transform: translateX(-50%) translateY(120px);',
      '  background: #18181c;',
      '  border: 1px solid rgba(52, 211, 153, 0.4);',
      '  color: #34d399;',
      '  padding: 0.75rem 1.4rem;',
      '  border-radius: 50px;',
      '  font-size: 0.86rem;',
      '  font-weight: 500;',
      '  z-index: 100000;',
      '  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);',
      '  box-shadow: 0 10px 30px rgba(0,0,0,0.5);',
      '  pointer-events: none;',
      '}',
      '.photo-toast.show { transform: translateX(-50%) translateY(0); }',
      '.photo-frame-uploader-trigger {',
      '  position: absolute;',
      '  bottom: 0.75rem;',
      '  right: 0.75rem;',
      '  z-index: 30;',
      '  background: rgba(15, 15, 18, 0.85);',
      '  border: 1px solid rgba(255, 255, 255, 0.2);',
      '  padding: 0.35rem 0.65rem;',
      '  border-radius: 6px;',
      '  font-size: 0.72rem;',
      '  color: rgba(255, 255, 255, 0.85);',
      '  cursor: pointer;',
      '  backdrop-filter: blur(8px);',
      '  display: flex;',
      '  align-items: center;',
      '  gap: 0.35rem;',
      '  transition: all 0.2s;',
      '}',
      '.photo-frame-uploader-trigger:hover {',
      '  background: rgba(255, 255, 255, 0.18);',
      '  color: #fff;',
      '  border-color: rgba(255, 255, 255, 0.5);',
      '}',
      '.global-drop-indicator {',
      '  position: fixed;',
      '  inset: 0;',
      '  z-index: 99998;',
      '  background: rgba(10, 10, 14, 0.85);',
      '  border: 3px dashed #60a5fa;',
      '  display: none;',
      '  align-items: center;',
      '  justify-content: center;',
      '  color: #60a5fa;',
      '  font-size: 1.4rem;',
      '  font-weight: 600;',
      '  letter-spacing: 0.05em;',
      '  pointer-events: none;',
      '  backdrop-filter: blur(6px);',
      '}',
      '.global-drop-indicator.show { display: flex; }'
    ].join('\n');
    document.head.appendChild(style);

    var dropInd = document.createElement('div');
    dropInd.id = 'global-drop-indicator';
    dropInd.className = 'global-drop-indicator';
    dropInd.textContent = '松开鼠标立即导入照片至项目';
    document.body.appendChild(dropInd);

    var dialog = document.createElement('div');
    dialog.id = 'photo-uploader-dialog';
    dialog.innerHTML = [
      '<div class="photo-dialog-box">',
      '  <div class="photo-dialog-title">检测到新照片</div>',
      '  <div class="photo-dialog-sub">请选择要保存的目标照片槽位（将直接写入项目物理文件）</div>',
      '  <img id="photo-dialog-img" class="photo-dialog-preview" src="" alt="预览">',
      '  <div class="photo-dialog-actions">',
      '    <button class="photo-slot-btn" data-slot="photo1">设为 照片 1</button>',
      '    <button class="photo-slot-btn" data-slot="photo2">设为 照片 2</button>',
      '    <button class="photo-slot-btn" data-slot="photo3">设为 照片 3</button>',
      '    <button class="photo-slot-btn" data-slot="me">设为主头像</button>',
      '  </div>',
      '  <div class="photo-dialog-foot">',
      '    <button class="photo-pick-more-btn" id="photo-file-picker-trigger">从电脑选择文件</button>',
      '    <button class="photo-cancel-btn" id="photo-cancel-btn">取消</button>',
      '  </div>',
      '</div>'
    ].join('');
    document.body.appendChild(dialog);

    var fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.id = 'photo-native-input';
    fileInput.accept = 'image/*';
    fileInput.multiple = true;
    fileInput.style.display = 'none';
    document.body.appendChild(fileInput);

    fileInput.addEventListener('change', function (e) {
      var files = e.target.files;
      if (!files || files.length === 0) return;
      if (files.length === 1) {
        handleFile(files[0], 'photo1');
      } else {
        // Multi upload: assign to photo1, photo2, photo3 automatically
        handleMultipleFiles(files);
      }
      fileInput.value = '';
    });

    document.getElementById('photo-file-picker-trigger').addEventListener('click', function () {
      fileInput.click();
    });

    var toast = document.createElement('div');
    toast.id = 'photo-toast';
    toast.className = 'photo-toast';
    document.body.appendChild(toast);

    document.getElementById('photo-cancel-btn').addEventListener('click', function () {
      dialog.classList.remove('open');
      pendingDataUrl = null;
    });

    dialog.querySelectorAll('.photo-slot-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var slot = this.getAttribute('data-slot');
        if (slot && pendingDataUrl) {
          uploadPhoto(slot, pendingDataUrl);
          dialog.classList.remove('open');
        }
      });
    });
  }

  var pendingDataUrl = null;

  function showToast(msg) {
    var toast = document.getElementById('photo-toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(function () {
      toast.classList.remove('show');
    }, 4000);
  }

  function openDialogWithImage(dataUrl, defaultSlot) {
    createUploaderUI();
    pendingDataUrl = dataUrl;
    var img = document.getElementById('photo-dialog-img');
    if (img) img.src = dataUrl;
    var dialog = document.getElementById('photo-uploader-dialog');
    if (dialog) {
      dialog.querySelectorAll('.photo-slot-btn').forEach(function (btn) {
        btn.classList.toggle('highlight', btn.getAttribute('data-slot') === defaultSlot);
      });
      dialog.classList.add('open');
    }
  }

  function uploadPhoto(slot, dataUrl, callback) {
    showToast('正在写入 ' + slot + '.jpg 到代码仓库...');
    fetch('/api/upload-photo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slot: slot, dataUrl: dataUrl })
    })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data.success) {
          showToast('已成功写入 ' + slot + '.jpg 到项目仓库！');
          refreshPageImages(slot, data.url);
          if (callback) callback(null, data);
        } else {
          showToast('保存失败: ' + (data.error || '未知错误'));
          if (callback) callback(new Error(data.error));
        }
      })
      .catch(function (err) {
        showToast('上传失败: ' + err.message);
        if (callback) callback(err);
      });
  }

  function handleMultipleFiles(files) {
    var slots = ['photo1', 'photo2', 'photo3'];
    var max = Math.min(files.length, 3);
    var count = 0;
    showToast('正在批量导入 ' + max + ' 张照片...');

    for (var i = 0; i < max; i++) {
      (function (idx) {
        var file = files[idx];
        var slot = slots[idx];
        var reader = new FileReader();
        reader.onload = function (e) {
          uploadPhoto(slot, e.target.result, function () {
            count++;
            if (count === max) {
              showToast('全部 ' + max + ' 张照片已写入项目仓库并更新完成！');
            }
          });
        };
        reader.readAsDataURL(file);
      })(i);
    }
  }

  function refreshPageImages(slot, newUrl) {
    document.querySelectorAll('img').forEach(function (img) {
      var current = img.getAttribute('src') || '';
      if (current.indexOf(slot + '.jpg') !== -1 || current.indexOf(slot + '.avif') !== -1) {
        img.src = newUrl;
      }
    });

    var slides = document.querySelectorAll('.about-photo-slide');
    if (slot === 'photo1' && slides[0]) slides[0].src = newUrl;
    if (slot === 'photo2' && slides[1]) slides[1].src = newUrl;
    if (slot === 'photo3' && slides[2]) slides[2].src = newUrl;
    if (slot === 'photo1' && slides[3]) slides[3].src = newUrl;
  }

  function handleFile(file, defaultSlot) {
    if (!file || !file.type.match(/^image\//)) return;
    var reader = new FileReader();
    reader.onload = function (e) {
      openDialogWithImage(e.target.result, defaultSlot);
    };
    reader.readAsDataURL(file);
  }

  // 1. Listen for global Paste (Ctrl+V / Cmd+V)
  window.addEventListener('paste', function (e) {
    var items = (e.clipboardData || e.originalEvent.clipboardData).items;
    for (var i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        var file = items[i].getAsFile();
        handleFile(file, 'photo1');
        e.preventDefault();
        return;
      }
    }
  });

  // 2. Full-page drag & drop support
  var dragCounter = 0;
  window.addEventListener('dragenter', function (e) {
    if (e.dataTransfer && e.dataTransfer.types && Array.from(e.dataTransfer.types).includes('Files')) {
      dragCounter++;
      var dropInd = document.getElementById('global-drop-indicator');
      if (dropInd) dropInd.classList.add('show');
    }
  });

  window.addEventListener('dragleave', function () {
    dragCounter = Math.max(0, dragCounter - 1);
    if (dragCounter === 0) {
      var dropInd = document.getElementById('global-drop-indicator');
      if (dropInd) dropInd.classList.remove('show');
    }
  });

  window.addEventListener('dragover', function (e) {
    e.preventDefault();
  });

  window.addEventListener('drop', function (e) {
    e.preventDefault();
    dragCounter = 0;
    var dropInd = document.getElementById('global-drop-indicator');
    if (dropInd) dropInd.classList.remove('show');

    var files = e.dataTransfer.files;
    if (!files || files.length === 0) return;

    if (files.length === 1) {
      handleFile(files[0], 'photo1');
    } else {
      handleMultipleFiles(files);
    }
  });

  // 3. Attach subtle trigger button to #about-photo-frame
  function setupFrameButton() {
    createUploaderUI();
    var frame = document.getElementById('about-photo-frame');
    if (!frame) return;

    if (frame.querySelector('.photo-frame-uploader-trigger')) return;

    var btn = document.createElement('button');
    btn.className = 'photo-frame-uploader-trigger';
    btn.innerHTML = '<span>📷 更换/导入照片</span>';
    btn.title = '点击直接选择电脑中的照片，或直接按 Ctrl+V 粘贴/拖入';

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var fileInput = document.getElementById('photo-native-input');
      if (fileInput) fileInput.click();
    });

    frame.appendChild(btn);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupFrameButton);
  } else {
    setupFrameButton();
  }

  window.triggerPhotoUpload = function (slot, base64Data) {
    uploadPhoto(slot, base64Data);
  };
})();
