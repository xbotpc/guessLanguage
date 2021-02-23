import { useCallback, useEffect, useState } from 'react';
import styles from './App.module.scss';
import cx from 'classnames';
import { NONAME } from 'dns';

const languages = [
  'javascript',
  'java',
  'python',
  'ruby',
  'golang',
  'erlang',
  'r',
  'haskell',
  'c',
  'kotlin',
  'dart',
  'rust',
  'elixir',
  'swift',
  'c#',
  'php',
  'visual basic',
  'cobol',
  'lisp',
  'julia',
]

const App = () => {
  const [uniqueCharactersEntered, setUniqueCharactersEntered] = useState<Array<string>>([]);
  const [currentLanguage, setCurrentLanguage] = useState<string>('');
  const [incorrectKeyPressCount, setIncorrectKeyPressCount] = useState<number>(0);
  const [gameWon, setGameWon] = useState<boolean>(false);

  useEffect(() => {
    getRandomLanguage();
  }, []);

  const onKeyPressListener = useCallback((e: KeyboardEvent) => {
    if ((e.key >= 'a' && e.key <= 'z') || e.key === '#' || e.key === ' ') {
      if (incorrectKeyPressCount < 6) {
        const _charactersEntered = [...new Set([...uniqueCharactersEntered, e.key])];
        if (!currentLanguage.match(e.key.toLowerCase().toString())) {
          setIncorrectKeyPressCount(c => c + 1);
          if (incorrectKeyPressCount >= 5) {
            setUniqueCharactersEntered(c => [...currentLanguage.split('')]);
            setGameWon(false);
          }
        } else if (_charactersEntered.length !== uniqueCharactersEntered.length) {
          setUniqueCharactersEntered([..._charactersEntered]);
        }
        const currentLanguageInArray = currentLanguage.split('');
        const wonOrLost = currentLanguageInArray
          .map((a) => _charactersEntered.includes(a.toLowerCase()))
          .every(z => z)
        setGameWon(wonOrLost);
      }
    }
  }, [currentLanguage, uniqueCharactersEntered, incorrectKeyPressCount])

  const onKeyClick = useCallback(() => {
    console.log('window click');
    if (window.screen.width < 500) {
      console.log('window click1');
      const aa = document.getElementsByTagName('input')[0]
      aa.focus();
      aa.click();
    }
  }, [])

  useEffect(() => {
    window.addEventListener('keypress', onKeyPressListener);
    window.addEventListener('click', onKeyClick)
    return () => {
      window.removeEventListener('keypress', onKeyPressListener);
      window.removeEventListener('click', onKeyClick)
    }
  }, [onKeyPressListener, onKeyClick]);

  const getRandomLanguage = () => {
    const randomNumber = Math.random() * 20;
    const _currentLanguage = languages[parseInt(randomNumber.toPrecision(), 10)];
    setCurrentLanguage(_currentLanguage);
  }

  const resetGame = () => {
    setGameWon(false);
    setIncorrectKeyPressCount(0);
    setCurrentLanguage('');
    setUniqueCharactersEntered([]);
  }

  const onClick = () => {
    resetGame();
    getRandomLanguage();
  }

  const renderLanguage = () => {
    return currentLanguage.split('')
      .map((x, i) => {
        return (
          <div className={cx(styles.text, {
            [styles.lose]: incorrectKeyPressCount > 5,
            [styles.win]: gameWon
          })} key={`${x}-${i}`}>
            {`${uniqueCharactersEntered.includes(x.toLowerCase())
              ? x
              : '_'}`}
          </div>
        );
      })
  };

  const renderStrikes = () => {
    const strikes = [];
    for (let j = 1; j <= 6; j++) {
      strikes.push(
        <div className={cx(styles.text, { [styles.strike]: j <= incorrectKeyPressCount })} key={j}>
          {'x'}
        </div>);
    }
    return strikes;
  }

  const renderLoadingIndicator = () => {
    return (
      <div className={styles.loadingIndicatorContainer}>
        <div>.</div>
        <div>.</div>
        <div>.</div>
      </div>
    )
  }

  const onfocus = () => {
    console.log('herer')
  }

  return (
    <>
      <main>
        <h1>Guess the language</h1>
        {gameWon || incorrectKeyPressCount > 5
          ? null
          : <h4>Start typing {renderLoadingIndicator()}</h4>
        }
        {gameWon || incorrectKeyPressCount > 5
          ? null
          : <div className={styles.guessStrikes}>
            {renderStrikes()}
          </div>
        }
        {gameWon || incorrectKeyPressCount > 5 ?
          <section className={cx({ [styles.gameWon]: gameWon })}>
            {gameWon
              ? 'Congrats! You guessed correct.'
              : incorrectKeyPressCount > 5
                ? 'Oops. Its'
                : null}
          </section>
          : null}
        <div className={cx(styles.container, {
          [styles.lose]: incorrectKeyPressCount > 5,
          [styles.win]: gameWon
        })}>
          {renderLanguage()}
        </div>
        {gameWon || incorrectKeyPressCount > 5
          ? <button onClick={onClick}>{gameWon ? 'Guess More' : 'Try again'}</button>
          : null}
        <input id={styles.invi} type="text" onFocus={onfocus} onClick={onfocus} />
      </main>
    </>
  )
}

export default App
