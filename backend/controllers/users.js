import response from "../helpers/response.js";

export default function(app, db, services) {
  const {
    Insight,
    BusinessInsight,
  } = db;

  const Controller = {

    tasks: async function(req, res, next) {
      let { user } = req;

      let queryBuilder = {}
      let tasks = await Insight.findAll(queryBuilder);

      queryBuilder = {
        include: {
          model: Insight,
          required: true
        },
        where: {
          businessId: user.id
        }
      }
      let ui = await BusinessInsight.findAll(queryBuilder);

      let list = tasks.map(task => ({
        id: task.id,
        name: task.name,
        done: !!ui.find(item => item.insightId == task.id),
      }));

      let done = ui.reduce((ac, item) => ac += item.Insight.weight, 0);
      let sum = tasks.reduce((ac, item) => ac += item.weight, 0);

      return response(res, req, next)({
        percent: ((done / sum) * 100).toFixed(2),
        Tasks: list
      })
    }
  }

  return Controller;
}