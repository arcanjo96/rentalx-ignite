import { CarsRepositoryInMemory } from "@modules/cars/repositories/inMemory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/inMemory/SpecificationInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarSpecificationUseCase } from "./createCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepository: CarsRepositoryInMemory;
let specificationsRepository: SpecificationsRepositoryInMemory;

describe("Create Car Specification", () => {
    beforeEach(() => {
        carsRepository = new CarsRepositoryInMemory();
        specificationsRepository = new SpecificationsRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepository, specificationsRepository);
    });

    it("should not be able to add a new specification to the car not exists", async () => {
        expect(async () => {
            const car_id = "1234";
            const specifications_id = ["1"];
            await createCarSpecificationUseCase.execute({ car_id, specifications_id });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should be able to add a new specification to the car", async () => {
        const car = await carsRepository.create({
            name: "Name Car",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Brand",
            category_id: "Category",
        });
        const specification = await specificationsRepository.create({
            description: "testing",
            name: "test"
        });
        const car_id = car.id;
        const specifications_id = [specification.id];
        const specificationsCar = await createCarSpecificationUseCase.execute({ car_id, specifications_id });
        expect(specificationsCar).toHaveProperty("specifications");
        expect(specificationsCar.specifications.length).toBe(1);
    });
});