import _0x3ec5fb from 'node-fetch';
import _0xdcffbe from '../lib/uploadImage.js';
let handler = async (_0x4f9075, {
  text: _0x378db0,
  conn: _0x5f1265,
  usedPrefix: _0x8563f,
  command: _0x4d8ac9
}) => {
  if (!_0x378db0 && !(_0x4f9075.quoted && _0x4f9075.quoted.text)) {
    throw "*欢迎，伟大的中国人，我的朋友，今天我能为您提供什么帮助吗？*\n\n*问我，我的朋友:*\n*" + (_0x8563f + _0x4d8ac9) + " 编写代码 node.js*\n*注：该命令还可以读取图像*\n";
  }
  try {
    const _0x1429fb = encodeURIComponent(_0x378db0);
    let _0x57eaa9 = null;
    let _0x30b50b = '';
    let _0x4e23aa = _0x4f9075.quoted ? _0x4f9075.quoted : _0x4f9075;
    if ((_0x4e23aa.msg || _0x4e23aa).mimetype || _0x4e23aa.mediaType || '') {
      let _0x2c1b59 = (_0x4e23aa.msg || _0x4e23aa).mimetype || _0x4e23aa.mediaType || '';
      if (_0x2c1b59.startsWith('video/')) {
        return _0x4f9075.reply("❌ 请发布照片，而不是视频！");
      }
      _0x57eaa9 = await _0x4e23aa.download();
      let _0x156836 = /image\/(png|jpe?g|gif)/.test(_0x2c1b59);
      _0x30b50b = await (_0x156836 ? _0xdcffbe : _0xdcffbe)(_0x57eaa9);
    }
    const _0x42a6e7 = _0x30b50b ? "https://kurosaki-api-41c2cc13d140.herokuapp.com/api/kurosaki-gpt?prompt=" + _0x1429fb + "&url=" + _0x30b50b : "https://kurosaki-api-41c2cc13d140.herokuapp.com/api/kurosaki-gpt?prompt=" + _0x1429fb + "&url=";
    _0x5f1265.sendPresenceUpdate("composing", _0x4f9075.chat);
    const _0x3d1c3b = await _0x3ec5fb(_0x42a6e7);
    const _0x3ef200 = await _0x3d1c3b.json();
    const _0x3d2a84 = _0x3ef200.result;
    _0x4f9075.reply(_0x3d2a84);
  } catch (_0x392add) {
    console.error("Error:", _0x392add);
    throw "*حدث خطأ فيـAPI*";
  }
};
handler.help = ["gpt-4"];
handler.tags = ['AI'];
handler.command = ["AIGPT中国", "aiGPT中国", "GPT中国-4", 'GPT中国', "gpt-china"];
export default handler;
