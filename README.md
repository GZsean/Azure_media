# 微软云流媒体

**1.引入 css & js 库**

**2. 编写DOM元素**

(```)
<video id="azuremediaplayer" class="azuremediaplayer amp-default-skin amp-big-play-centered" tabindex="0"></video>
(```)

**3.实例化播放控件，并且使用参数进行播放**

(```)
var myOptions = {
     autoplay: true,
     controls: true,
     width: '460px;',
     height: '200px;',
     poster: '' // this.videoData.cover
}

var myPlayer = null

myPlayer = amp('azuremediaplayer', myOptions)

myPlayer.src([
      {
        src: "http://watch-cne21.streaming.media.chinacloudapi.cn/5891fb17-33f4-4521-9e86-7e6c3e377b66/f7653ca6dc484d049024d898a6fd93cb.ism/manifest",
        type: 'application/vnd.ms-sstr+xml',
        protectionInfo: [
          {
            type: 'AES',
            authenticationToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJ1cm46Y29udG9zbyIsInVybjptaWNyb3NvZnQ6YXp1cmU6bWVkaWFzZXJ2aWNlczpjb250ZW50a2V5aWRlbnRpZmllciI6ImM2NTQwMjBlLTMxNzQtNDkxNi05MDE5LTA5ZWNhN2E1MjU0NyIsImlzcyI6Imh0dHBzOi8vc3RzLmNvbnRvc28uY29tIiwiZXhwIjoxNjE1NjMyMDQzLCJpYXQiOjE2MTUzNzI1NDN9.2Qaehvu1eVZjd2464sFNtfveYlTewySa7K9fCp4zai4"
          }
        ]
      }
    ])
(```)

*authenticationToken 和 src为后台提供的参数 *


