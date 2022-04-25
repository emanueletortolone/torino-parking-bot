import {
  orderByFree,
  filterByOkStatus,
  orderByNearest
} from '../../src/data/parkingDataSorter';

describe('orderByFree', () => {
  it('should order by Free property DESC', () => {
    //  ARRANGE
    const data = [
      {
        'Name': 'BOLZANO',
        'ID': '3',
        'status': '1',
        'Total': '858',
        'Free': '632',
        'tendence': '1',
        'lat': '45.072478',
        'lng': '7.667162'
      },
      {
        'Name': 'LINGOTTO',
        'ID': '7',
        'status': '1',
        'Total': '3380',
        'Free': '3167',
        'tendence': '1',
        'lat': '45.031625',
        'lng': '7.662682'
      },
      {
        'Name': 'MOLINETTE',
        'ID': '25',
        'status': '0',
        'Total': '481',
        'Free': '476',
        'tendence': '1',
        'lat': '45.038575',
        'lng': '7.675885'
      }
    ];

    // ACT
    const orderedList = orderByFree(data);

    // ASSERT
    expect(orderedList[0].Name).toEqual('LINGOTTO');
    expect(orderedList[1].Name).toEqual('BOLZANO'); 
    expect(orderedList[2].Name).toEqual('MOLINETTE');
     
  });
});

describe('filterByOkStatus', () => {
  it('should remove item with status == 0', () => {

    //  ARRANGE
    const data = [
      {
        'Name': 'BOLZANO',
        'ID': '3',
        'status': '1',
        'Total': '858',
        'Free': '632',
        'tendence': '1',
        'lat': '45.072478',
        'lng': '7.667162'
      },
      {
        'Name': 'LINGOTTO',
        'ID': '7',
        'status': '1',
        'Total': '3380',
        'Free': '3167',
        'tendence': '1',
        'lat': '45.031625',
        'lng': '7.662682'
      },
      {
        'Name': 'MOLINETTE',
        'ID': '25',
        'status': '0',
        'Total': '481',
        'Free': '476',
        'tendence': '1',
        'lat': '45.038575',
        'lng': '7.675885'
      }
    ];

    // ACT
    const filteredList = filterByOkStatus(data);

    // ASSERT
    expect(filteredList).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ Name: 'BOLZANO' }),
        expect.objectContaining({ Name: 'LINGOTTO' })
      ])
    );
    expect(filteredList).toHaveLength(2);
  })
});

describe('orderByNearest', () => {
  it('should order by the nearest item in Km', () => {

    //  ARRANGE
    const data = [
      {
        'Name': 'BOLZANO',
        'ID': '3',
        'status': '1',
        'Total': '858',
        'Free': '632',
        'tendence': '1',
        'lat': '45.072478',
        'lng': '7.667162'
      },
      {
        'Name': 'LINGOTTO',
        'ID': '7',
        'status': '1',
        'Total': '3380',
        'Free': '3167',
        'tendence': '1',
        'lat': '45.031625',
        'lng': '7.662682'
      },
      {
        'Name': 'MOLINETTE',
        'ID': '25',
        'status': '1',
        'Total': '481',
        'Free': '476',
        'tendence': '1',
        'lat': '45.038575',
        'lng': '7.675885'
      }
    ];

    const currentPosition = {
      latitude: 45.0621537,
      longitude: 7.6782032
    };

    // ACT
    const orderedList = orderByNearest(
      currentPosition.latitude,
      currentPosition.longitude,
      data);

    // ASSERT
    expect(orderedList[0].Name).toEqual('BOLZANO'); 
    expect(orderedList[1].Name).toEqual('MOLINETTE');
    expect(orderedList[2].Name).toEqual('LINGOTTO');
  })
});