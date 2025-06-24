import { Test, TestingModule } from '@nestjs/testing';
import { OperacionesController } from './operaciones.controller';
import { OperacionesService } from './operaciones.service';

describe('OperacionesController', () => {
  let controller: OperacionesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OperacionesController],
      providers: [OperacionesService],
    }).compile();

    controller = module.get<OperacionesController>(OperacionesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  
    test('test para controller', () => {
        const controller = new OperacionesController(new OperacionesService());
        const res: any = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        controller.operar(res, 'suma','2', '3');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            resultado: 5,
            mensaje: 'operación exitosa',
        });
    });

    test('test controller 502', () => {
        const controller = new OperacionesController(new OperacionesService());

        const res: any = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        controller.operar(res, 'suma', '0','0');

        expect(res.status).toHaveBeenCalledWith(502);
        expect(res.json).toHaveBeenCalledWith({
            resultado: NaN,
            mensaje: 'operación no pudo ser calculada',
        });
    });
});
