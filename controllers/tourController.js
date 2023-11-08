const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    res.status(404).json({
      status: 'fail',
      message: 'Missing body',
    });
  }

  next();
};

exports.checkID = (req, res, next, val) => {
  const tour = tours.find((el) => el.id === Number(val));

  if (!tour) {
    res.status(404).json({
      status: 'fail',
      message: 'Cannot find specific tour',
    });
  }

  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    result: tours.length,
    requestedAt: req.requestedAt,
    data: {
      tours: tours,
    },
  });
};

exports.getTour = (req, res) => {
  const id = parseInt(req.params.id);
  const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      tour: tour,
    },
  });
};

exports.updateTour = (req, res) => {
  const id = parseInt(req.params.id);
  const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Update tour here...>',
    },
  });
};

exports.deleteTour = (req, res) => {
  const id = parseInt(req.params.id);
  const tour = tours.find((el) => el.id === id);

  res.status(204).json({
    status: 'success',
    data: null,
  });
};

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  // dùng writeFile thay vì writeFileSync vì ta đang ở trong
  // một callback function, đã ở trong event loop rồi nên
  // phải dùng một hàm synchronous.
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};
