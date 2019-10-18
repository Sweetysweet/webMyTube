'use strict';
document.addEventListener('DOMContentLoaded', () => {

    //Экранная клавиатура -  чтобы закрыть код от остального писать через {}

    {
        const keyboardButton = document.querySelector('.search-form__keyboard');
        const keyboard = document.querySelector('.keyboard');
        const closeKeyboard = document.getElementById('close-keyboard');
        const searchInput = document.querySelector('.search-form__input');

        const toggleKeyboard = () => {
            keyboard.style.top = keyboard.style.top ? '' : '50%';
        };
        // вывод символов на экран с методом trim 
        const changeLang = (btn, lang) => {
            const langRu = [
                'ё', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '-', '=', 'del',
                'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ',
                'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э',
                'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.',
                'en', ' '
            ];
            const langEn = ['`', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '-', '=', 'del',
             'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']',
             'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '"',
             'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/',
             'ru', ' '
            ]; 

            if(lang === 'en') {
                btn.forEach((elem, i) => {
                    elem.textContent = langEn[i];
                })
            } else {
                btn.forEach((elem, i) => {
                    elem.textContent = langRu[i];
                })
            }
        }

        const typing = event => {
            const target = event.target;
           
            if(target.tagName.toLowerCase() === 'button') {
                 // исключим невидимые кнопки из console
                const buttons = [...keyboard.querySelectorAll('button')]
                    .filter(elem => elem.style.visibility !== 'hidden');
                const contentButton = target.textContent.trim();
                // backspace/space/en+ru
                if(contentButton === 'del') {
                    searchInput.value = searchInput.value.slice(0, -1)
                } else if(!contentButton){
                    searchInput.value += ' ';
                } else if(contentButton === 'en' ||
                contentButton === 'ru') {
                    changeLang(buttons, contentButton)
                } else {
                    searchInput.value += contentButton;
                }
            }
        };

        keyboardButton.addEventListener('click', toggleKeyboard);
        closeKeyboard.addEventListener('click', toggleKeyboard);
        keyboard.addEventListener('click', typing);
    }

        //Меню
    {
        const burger = document.querySelector('.spinner');
        const sidebarMenu = document.querySelector('.sidebarMenu');

        burger.addEventListener('click', () => {
            burger.classList.toggle('active');
            sidebarMenu.classList.toggle('rollUp');
        });

        sidebarMenu.addEventListener('click', e => {
            let target = e.target;
            target = target.closest('a[href="#"]'); // проверка у элемента селектора

            if(target) {
                const parentTarget = target.parentElement;
                sidebarMenu.querySelectorAll('li').forEach(elem => {
                    if(elem === parentTarget) {
                        elem.classList.add('active');
                    } else {
                        elem.classList.remove('active');
                    }
                })
            }
        })

    }

      
        //получим все элементы со стр у которых есть атрибут
    const youtuber = () => {    
        const youtuberItems = document.querySelectorAll('[data-youtuber]');
        const youTuberModal = document.querySelector('.youTuberModal');
        const youtuberContainer = document.getElementById('youtuberContainer');

        // стили для видео
        // ширина + высота qw qh
        const qw = [3840, 2560, 1920, 1280, 854, 640, 426, 256];
        const qh = [2160, 1440, 1080, 720, 480, 360, 240, 144];

        const sizeVideo = () => {
            // получение клиентского размера экрана(ширина и высота окна)
           const ww = document.documentElement.clientWidth;
           const wh = document.documentElement.clientHeight;
           console.log(ww+'px');
           for(let i = 0; i < qw.length; i++) {
               if(ww > qw[i]) {
                   youtuberContainer.querySelector('iframe').style.cssText = `
                       width: ${qw[i]}px;
                       height: ${qh[i]}px;
                   `;
                   youtuberContainer.style.cssText = `
                       width: ${qw[i]}px;
                       height: ${qh[i]}px;
                       top: ${(wh - qh[i]) / 2}px;
                       left: ${(ww - qw[i]) / 2}px;
                   `;
                   break;  
               }
           }
       }
        
        // получаем id видео(через data-attribute) перебирая все элементы
        youtuberItems.forEach(elem => {
            elem.addEventListener('click', () => {
                const idVideo = elem.dataset.youtuber;
                youTuberModal.style.display = 'block';

                const youTuberFrame = document.createElement('iframe');
                youTuberFrame.src = `https://youtube.com/embed/${idVideo}`;
                youtuberContainer.insertAdjacentElement('beforeend', youTuberFrame);

                window.addEventListener('resize', sizeVideo);

                sizeVideo();
            })
        })
        // закрытие модалки
        youTuberModal.addEventListener('click', () => {
            youTuberModal.style.display = '';
            youtuberContainer.textContent = '';
            window.removeEventListener('resize', sizeVideo);
        })  
    }

        // Модальное окно
    {   
        document.body.insertAdjacentHTML('beforeend', `
            <div class="youTuberModal">
                <div id="youtuberClose">&#215;</div>
                <div id="youtuberContainer"></div>
            </div>
            `);
        youtuber()
    }

    //api

    {
        const API_KEY = 'AIzaSyAkr0ffFczVAe4-wt2015VHarBBvLUHkdU';
        const CLIENT_ID = '691840495452-udtrij4lef2nk7athibafpd88gpu3jba.apps.googleusercontent.com';

        //авторизация
        {   
            const buttonAuth = document.getElementById('authorize');
            const authBlock = document.querySelector('.auth');
            //если user закрыл окно auth
            const errorAuth = err => {
                console.error(err);
                authBlock.style.display = '';
            };

            console.log(window.gapi);
            gapi.load("client:auth2", () => gapi.auth2.init({client_id: CLIENT_ID}));

                // promise
                // .then(()=>{})
                // .catch(()=>{}) 
            // функция авторизации
            const authenticate = () => gapi.auth2.getAuthInstance()
                    .signIn({scope: "https://www.googleapis.com/auth/youtube.readonly"})
                    .then(() => console.log("Авторизация успешна!"))
                    .catch(errorAuth);

            //Передача apikey и обращение к RESTapi
            const loadClient = () => {
              gapi.client.setApiKey(API_KEY);
              return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
                  .then(() => console.log("GAPI client loaded for API")) 
                  .then(() => authBlock.style.display = 'none')
                  .catch(errorAuth);
            }
             
              
            buttonAuth.addEventListener('click', () => {
              authenticate().then(loadClient)
            })
            

        }
        //запросы к серверу
        {
          const gloTube = document.querySelector('.logo-academy');  
          const trends = document.getElementById('yt_trend');
          const like = document.getElementById('yt_like');
            //method принимает свойства search
          const request = options => gapi.client.youtube[options.method]
            .list(options)
            .then(response => response.result.items)
            .then(render)
            .then(youtuber)
            .catch(err => console.err('Во время запроса произошла ошибка: ' + err));

          const render = data => {
            console.log(data);
            const ytWrapper = document.getElementById('yt-wrapper');
            ytWrapper.textContent = '';
            data.forEach(item => {
                try {
                    //деструктуризация - достанем из объекта item переменные из всех 6 видео
                    const {
                        id,
                        id: {
                            videoId
                        }, 
                        snippet: {
                            channelTitle, 
                            title,
                            resourceId: {
                                videoId: likedVideoId
                            } = {}, // когда нет resoursID будет {} поумолчанию undefined
                            thumbnails: {
                                high: {
                                    url
                                }
                            }
                        }
                    } = item;
                    ytWrapper.innerHTML += `
                        <div class="yt" data-youtuber="${likedVideoId || videoId || id}">
                            <div class="yt-thumbnail" style="--aspect-ratio:16/9;">
                              <img src="${url}" alt="thumbnail" class="yt-thumbnail__img">
                            </div>
                            <div class="yt-title">${title}</div>
                            <div class="yt-channel">${channelTitle}</div>
                        </div>
                    `;
                } catch (err) {
                    console.error(err);
                }
            })
          };
          
          gloTube.addEventListener('click', () => {
              //опции в виде объекта
              //все детали при клике на лого
              request({
                method: 'search',
                part: 'snippet',
                channelId: 'UCVswRUcKC-M35RzgPRv8qUg',
                //порядок вывода видео - сперва новые
                order: 'date',
                maxResults: 6,
              })
          });

          trends.addEventListener('click', () => {
              //опции в виде объекта
              //все детали при клике на Тренды
              request({
                method: 'videos',
                part: 'snippet',
                chart: 'mostPopular',
                maxResults: 6,
                regionCode: 'RU'
              })
          });

          like.addEventListener('click', () => {
              //опции в виде объекта
              //все детали при клике на понравившиеся
              request({
                method: 'playlistItems',
                part: 'snippet',
                playlistId: 'LLdNxV3VfI8PqiQDx52WfOkw',
                maxResults: 6,
              })
          });

          
          
        }
    }

});