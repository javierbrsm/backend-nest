import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!!');
  });

  it('/operaciones (GET)', () => {
    return request(app.getHttpServer())
      .get('/operaciones')
      .query({ operacion: 'suma', a: 10, b: 30 })
      .expect(200)
      .expect('Content-type', /application\/json/)
      .then((response) => {
        expect(response.body.resultado).toBe(40);
      });
  });

  it('/operaciones (GET) suma valida', () => {
    return request(app.getHttpServer())
      .get('/operaciones')
      .query({ operacion: 'suma', a: 100, b: 100 })
      .expect(200)
      .expect('Content-type', /application\/json/)
      .then((response) => {
        expect(response.body.resultado).toBe(200);
      });
  });

  it('/operaciones (GET) operación inválida', () => {
    return request(app.getHttpServer())
      .get('/operaciones')
      .query({ operacion: 'raiz', a: 2, b: 3 })
      .expect(500);
  });

  it('/operaciones (GET) falta a', () => {
    return request(app.getHttpServer())
      .get('/operaciones')
      .query({ operacion: 'suma', b: 5 })
      .expect(502);
  });

  it('/operaciones (GET) a como string', () => {
    return request(app.getHttpServer())
      .get('/operaciones')
      .query({ operacion: 'suma', a: 'hola', b: 3 })
      .expect(502);
  });

  it('/operaciones (GET) división por 0', () => {
    return request(app.getHttpServer())
      .get('/operaciones')
      .query({ operacion: 'division', a: 10, b: 0 })
      .expect(500);
  });

  it('/operaciones (GET) factorial negativo', () => {
    return request(app.getHttpServer())
      .get('/operaciones')
      .query({ operacion: 'factorial', a: -5 })
      .expect(500);
  });


  it('/operaciones (GET) factorial decimal', () => {
    return request(app.getHttpServer())
      .get('/operaciones')
      .query({ operacion: 'factorial', a: 3.5 })
      .expect(500);
  });

  it('/operaciones (GET) b como null ', () => {
    return request(app.getHttpServer())
      .get('/operaciones')
      .query({ operacion: 'suma', a: 5, b: 'null' })
      .expect(502);
  });

  it('/operaciones (GET) sin parámetro b (undefined)', () => {
    return request(app.getHttpServer())
      .get('/operaciones')
      .query({ operacion: 'suma', a: 5 })
      .expect(502);
  });

  
});
