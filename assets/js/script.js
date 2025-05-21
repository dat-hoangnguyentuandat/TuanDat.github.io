let mobile = 'ontouchstart' in document.documentElement;

let switchAllowed = false;

let boxClicks = 0;

function openSocial(type) {
  let url = 'about:blank';

  switch (type) {
    case 'discord':
      url = 'https://discord.com/channels/823981540567416834';
      break;
    case 'github':
      url = 'https://github.com/dat-hoangnguyentuandat';
      break;
    case 'facebook':
      url = 'https://www.facebook.com/hoangdatlnbp/';
      break;
  }

  window.open(url);
}

function startIntroTyping() {
  new TypeIt('#intro-text', {
    speed: 100,
  })
    .type('welcome.', { delay: 400 })
    .delete(null, { delay: 300 })
    .type(`${mobile ? 'tap' : 'press any key'} to enter.`)
    .go();

  setTimeout(function () {
    switchAllowed = true;
  }, 2500);
}

function typerStartTyping(typer) {
  typer.reset();

  let text = [' Chill ', ' Sleep ', ' Code '];

  text.forEach(function (language, index) {
    typer.move(null);
    typer.type(language, { delay: 1000 });
    typer.pause(1000);

    typer.delete(language.length, { delay: 1000 });
  });

  typer.go();
}

function startMainTyping() {
  let typer = new TypeIt('#subtext', {
    speed: 50,
    afterComplete: async () => {
      typerStartTyping(typer);
    },
  });

  typerStartTyping(typer);
}

function switchScreen() {
  document.title = 'TuanDat | home';

  $('.intro').fadeOut(1000, function () {
    $('.bg-image').fadeIn(1000);
    $('.main').fadeIn(1000, function () {
      startMainTyping();
    });
  });
}

document.addEventListener('keydown', function (e) {
  if (switchAllowed) {
    switchAllowed = false;
    switchScreen();
  }
});

document.addEventListener('touchstart', function (e) {
  if (switchAllowed && mobile) {
    switchAllowed = false;
    switchScreen();
  }
});

document.addEventListener('DOMContentLoaded', function () {
  startIntroTyping();
  document.onselectstart = () => false;
  $('.box').click(() => {
    boxClicks++;

    if (boxClicks === 10) {
      // fade out box
      $('.box').fadeOut(1000, () => {
        document.body.requestFullscreen();
      });
    }
  });
});
