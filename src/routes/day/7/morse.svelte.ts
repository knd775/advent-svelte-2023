export class Morse {
  #audio: Audio | undefined;
  #morseCode = new Map([
    ['A', '.-'],
    ['B', '-...'],
    ['C', '-.-.'],
    ['D', '-..'],
    ['E', '.'],
    ['F', '..-.'],
    ['G', '--.'],
    ['H', '....'],
    ['I', '..'],
    ['J', '.---'],
    ['K', '-.-'],
    ['L', '.-..'],
    ['M', '--'],
    ['N', '-.'],
    ['O', '---'],
    ['P', '.--.'],
    ['Q', '--.-'],
    ['R', '.-.'],
    ['S', '...'],
    ['T', '-'],
    ['U', '..-'],
    ['V', '...-'],
    ['W', '.--'],
    ['X', '-..-'],
    ['Y', '-.--'],
    ['Z', '--..'],
    ['1', '.----'],
    ['2', '..---'],
    ['3', '...--'],
    ['4', '....-'],
    ['5', '.....'],
    ['6', '-....'],
    ['7', '--...'],
    ['8', '---..'],
    ['9', '----.'],
    ['0', '-----'],
    [' ', '/']
  ]);

  constructor() {
    $effect(() => {
      this.#audio = new Audio();
    });
  }

  get playing() {
    return this.#audio?.playing ?? false;
  }

  convert = (message: string) => {
    let result = '';
    for (let i = 0; i < message.length; i++) {
      const char = message[i]?.toUpperCase();
      if (char && this.#morseCode.has(char)) {
        result += this.#morseCode.get(char);
      }

      if (i !== message.length - 1) {
        result += ' ';
      }
    }
    return result;
  };

  playMessage = (message: string) => {
    const audio = new Audio();
    const morse = this.convert(message);
    const audioQueue: { frequency: number; time: number }[] = [];

    if (!morse) return;

    for (let i = 0; i < morse.length; i++) {
      const char = morse[i];
      if (char === '.') {
        audioQueue.push({ frequency: 650, time: 1 });
        audioQueue.push({ frequency: 0, time: 1 });
      } else if (char === '-') {
        audioQueue.push({ frequency: 650, time: 3 });
        audioQueue.push({ frequency: 0, time: 1 });
      } else if (char === ' ') {
        audioQueue.push({ frequency: 0, time: 3 });
      } else if (char === '/') {
        audioQueue.push({ frequency: 0, time: 7 });
      }
    }

    audio.playQueue(audioQueue);
  };
}

// Muting (setting gain to 0) is a much better way to implement this, but I'm in to deep now
class Audio {
  #context: AudioContext;
  #baseTime = 100;
  playing = $state(false);

  constructor() {
    this.#context = new AudioContext();
  }

  play(frequency: number, time: number) {
    const oscillator = this.#context.createOscillator();
    const gainNode = this.#context.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(this.#context.destination);
    oscillator.frequency.value = frequency;
    oscillator.start(0);

    setTimeout(() => {
      gainNode.gain.exponentialRampToValueAtTime(0.00001, this.#context.currentTime + 0.1);
    }, time);
  }

  playQueue(queue: { frequency: number; time: number }[]) {
    this.playing = !!queue.length;

    if (queue.length === 0) return;

    const { frequency, time } = queue.shift() ?? { frequency: 0, time: 0 };
    $inspect(frequency);
    $inspect(time);
    console.log('frequency', frequency);
    console.log('time', time);

    if (frequency === 0 && time === 0) {
      this.playQueue(queue);
      return;
    }

    if (frequency !== 0) {
      this.play(frequency, time * this.#baseTime);
    }

    setTimeout(() => {
      this.playQueue(queue);
    }, time * this.#baseTime);
  }
}
