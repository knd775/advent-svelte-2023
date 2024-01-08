const cardImageUrlBase = 'https://advent.sveltesociety.dev/data/2023/day-eight';

export class CardGame {
  cards: Card[] = $state([]);
  blocked = $derived(this.flippedCards.length >= 2);
  active = $state(false);
  timer = $state(0);
  #interval: number | null = null;

  constructor() {
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
          console.log('no match', this.flippedCards);
          this.flippedCards.forEach((card) => {
            setTimeout(() => {
              console.log('unflipping', card, card.flipped);
              card.unflip();
              console.log('unflipped', card, card.flipped);
            }, 750);
          });
        }
      }
      return () => {
        console.log('checking cards', this.flippedCards, this.flippedCards.length);
      };
    });

    $effect(() => {
      if (this.numberOfMatches === 24) {
        this.active = false;
      }
    });

    $effect(() => {
      if (!this.active && this.flippedCards.length > 0) {
        this.active = true;
      }
    });

    $effect(() => {
      if (this.active) {
        this.#interval = setInterval(() => {
          this.timer++;
        }, 1000);
      } else if (this.#interval) {
        clearInterval(this.#interval);
        this.timer = 0;
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
    let currentIndex = this.cards.length;
    let randomIndex: number;

    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [this.cards[currentIndex], this.cards[randomIndex]] = [
        this.cards[randomIndex] ?? new Card(0, this),
        this.cards[currentIndex] ?? new Card(0, this)
      ];
    }
  }

  reset() {
    this.createDeck();
    this.shuffle();
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
