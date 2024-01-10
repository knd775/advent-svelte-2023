const cardImageUrlBase = 'https://advent.sveltesociety.dev/data/2023/day-eight';

export class CardGame {
  cards: Card[] = $state([]);
  blocked = $derived(this.flippedCards.length >= 2);
  active = $state(false);
  timer = $state(0);
  complete = $derived(this.numberOfMatches === 24);
  highScore = $state(0);
  #interval: number | null = null;

  constructor(gameComplete: ((time: number) => void) | undefined) {
    $effect(() => {
      this.createDeck();
      this.shuffle();
    });

    $effect(() => {
      if (this.flippedCards.length === 2) {
        const card1 = this.flippedCards[0]!;
        const card2 = this.flippedCards[1]!;
        if (card1.value === card2.value) {
          card1.matched = true;
          card2.matched = true;
        } else {
          this.flippedCards.forEach((card) => {
            setTimeout(() => {
              card.unflip();
            }, 750);
          });
        }
      }
    });

    $effect(() => {
      if (this.complete) {
        if (this.timer < this.highScore || this.highScore === 0) {
          this.highScore = this.timer;
        }
        gameComplete?.(this.timer);
        this.active = false;
      }
    });

    $effect(() => {
      if (!this.active && this.flippedCards.length > 0) {
        this.active = true;
      }
    });

    $effect(() => {
      if (this.active && !this.#interval) {
        this.#interval = setInterval(() => {
          this.timer++;
        }, 1000);
      } else if (this.#interval && !this.active) {
        clearInterval(this.#interval);
        this.#interval = null;
      }
    });
  }

  createDeck() {
    this.cards = [];
    for (let i = 1; i <= 24; i++) {
      this.cards.push(new Card(i, this));
      this.cards.push(new Card(i, this));
    }
  }

  shuffle() {
    const shuffleArray = [...this.cards];
    let currentIndex = shuffleArray.length;
    let randomIndex: number;

    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [shuffleArray[currentIndex], shuffleArray[randomIndex]] = [
        shuffleArray[randomIndex] ?? new Card(0, this),
        shuffleArray[currentIndex] ?? new Card(0, this)
      ];
    }

    this.cards = shuffleArray;
  }

  reset() {
    this.timer = 0;
    this.createDeck();
    this.shuffle();
    this.active = false;
  }

  get numberOfMatches() {
    return this.cards.filter((card) => card.matched).length / 2;
  }

  get flippedCards() {
    return this.cards.filter((card) => card.flipped && !card.matched);
  }
}

class Card {
  value: number;
  matched = $state(false);
  flipped = $state(false);
  game: CardGame;

  constructor(value: number, game: CardGame) {
    this.value = value;
    this.game = game;
  }

  flip() {
    if (this.game.blocked) return;
    this.flipped = true;
  }

  unflip() {
    this.flipped = false;
  }

  get imageUrl() {
    return `${cardImageUrlBase}/${this.value}.png`;
  }
}
