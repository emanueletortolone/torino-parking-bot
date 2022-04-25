import {
  renderStatusIcon,
  parkingToButton
} from '../../src/mappers/parkingToButton';

describe('renderStatusIcon', () => {
  it('should return red icon if percent is 0', () => {
    // ASSERT
    expect(renderStatusIcon(200, 0)).toBe('🔴');
  });

  it('should return orange icon if percent is between 1 and 15', () => {
    // ASSERT
    expect(renderStatusIcon(200, 30)).toBe('🟠');
    expect(renderStatusIcon(200, 27)).toBe('🟠');
    expect(renderStatusIcon(200, 1)).toBe('🟠');
  });

  it('should return green icon if percent is greater than 15', () => {
    // ASSERT
    expect(renderStatusIcon(200, 31)).toBe('🟢');
    expect(renderStatusIcon(200, 200)).toBe('🟢');
  });
});


describe('parkingToButton', () => {
  it('should return a multi dimensional array of objects', () => {
    // ARRANGE
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
      }
    ];

    // ACT
    const result = parkingToButton(data, 45.0621537, 7.6782032);

    // ASSERT
    expect(result).toEqual(
      expect.arrayContaining([
        expect.arrayContaining([
          expect.objectContaining({
            text: '🟢 BOLZANO (1.4 km): 632 available',
            callback_data: '45.072478|7.667162'
          })
        ]), 
        expect.arrayContaining([
          expect.objectContaining({
            text: '🟢 LINGOTTO (3.6 km): 3167 available',
            callback_data: '45.031625|7.662682'
          })
        ])
      ]),
    );
    expect(result).toHaveLength(2);
  });
});