export default class Utils {

    public static snapshotActionToData(actions) {
        return actions.map(action => {
            if(action.payload.val() instanceof Object) {
                return { $key: action.key, ...action.payload.val() };
            } else {
                return { $key: action.key, value: action.payload.val() };
            }
        });
    }

    public static snapshotActionObjectToData(action) {
        let obj = action.payload.val();
        if (obj) {
            Object.assign(obj, {$key: action.key});
        }
        return obj;
    }

    public static getDaysOfWeek() {
        return [
            {
                value: 'monday',
                title: 'Segunda Feira'
            },
            {
                value: 'tuesday',
                title: 'Terça Feira'
            },
            {
                value: 'wednesday',
                title: 'Quarta Feira'
            },
            {
                value: 'thursday',
                title: 'Quinta Feira'
            },
            {
                value: 'friday',
                title: 'Sexta Feira'
            },
            {
                value: 'saturday',
                title: 'Sabado'
            },
            {
                value:'sunday',
                title: 'Domingo'
            }
        ];
    }
}
