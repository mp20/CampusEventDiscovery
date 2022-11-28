public class Car implements Prototype{
    private String company;
    private String model;
    int horsepower;

    public Car(Car car) {
        this.company = car.company;
        this.model = car.model;
        this.horsepower = car.horsepower;
    }

    @Override
    public Car clone() {
        return new Car(this);
    }
}
