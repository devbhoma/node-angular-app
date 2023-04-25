export default class WS {
    private io:any;
    private web:any;
    public documents:any = {};

    constructor(io:any,application:any) {
        this.web = application;
        this.io = io;

        this.init();
    }

    init() {

        this.io.on('connection', socket => {
            let previousId;
            const safeJoin = currentId => {
                socket.leave(previousId);
                socket.join(currentId, () => console.log(`Socket ${socket.id} joined room ${currentId}`));
                previousId = currentId;
            }

            socket.on('getDoc', docId => {
                safeJoin(docId);
                socket.emit('document', this.documents[docId]);
            });

            socket.on('addDoc', doc => {
                this.documents[doc.id] = doc;
                safeJoin(doc.id);
                this.io.emit('documents', Object.keys(this.documents));
                socket.emit('document', doc);
            });

            socket.on('editDoc', doc => {
                this.documents[doc.id] = doc;
                console.log('---doc-----',doc);
                //this.web.getData();
                socket.to(doc.id).emit('document', doc);
            });

            this.io.emit('documents', Object.keys(this.documents));

            console.log(`Socket ${socket.id} has connected`);
        });
    }

}