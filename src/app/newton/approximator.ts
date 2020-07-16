export class NewtonApproximator {
  static sqrt(n: number): number {
    if (n <= 0) {
      return 0;
    }

    let approximation: number;
    let nextApproximation: number = 1.0;

    while (nextApproximation != approximation) {
      approximation = nextApproximation;
      nextApproximation = 0.5 * (n / approximation + approximation);
    }
    return approximation;
  }
}
