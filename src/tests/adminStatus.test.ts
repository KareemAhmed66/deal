import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

chai.use(chaiHttp);
const { expect } = chai;

describe('Admin Stats Endpoint', () => {
  it('should return stats', (done) => {
    chai
      .request(app)
      .get('localhost:3000/api/v1/admin/statistics')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        // add more assertions based on your expected response structure
        done();
      });
  });

  // add more tests to cover different scenarios and edge cases
});
