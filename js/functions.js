class Point{
    x;
    y;
    constructor(x, y){
        
        /*A point specified by (x,y) coordinates in the cartesian plane*/
        this.x = x;
        this.y = y;
    }
    toString () {
        return this.x + ", " + this.y;
    }
}


class RayPolygon{
    points = [];
    edges = [];
    constructor(points){
        /*points: a list of Points in clockwise order.*/
        this.points = points
        this.edges = this.setEdges()
    }

    setPoints(points){
        this.points = points;
    }

    setEdges(){
        /* Returns a list of tuples that each contain 2 points of an edge */
        var edge_list = []
        var p1;
        var p2;
        for (var i = 0; i < this.points.length-1; i++){
            this.points.push
            p1 = this.points[i]
            p2 = this.points[i+1]
            edge_list.push([p1,p2])
        }
        p1 = this.points[this.points.length-1]
        p2 = this.points[0]
        edge_list.push([p1,p2])

        return edge_list
    }

    contains(point){
        /*# _huge is used to act as infinity if we divide by 0*/
        var _huge = 99999
        var _tiny = 0.00001
        /* # _eps is used to make sure points are not on the same line as vertexes*/
        var _eps = 0.00001

        /*# We start on the outside of the polygon*/
        var inside = false;
        var A, B;
        for (var i = 0; i < this.edges.length; i++){
            /*# Make sure A is the lower point of the edge*/
            A = this.edges[i][0]
            B = this.edges[i][1]
            if (A.y > B.y){
                var tmp = A;
                A = B;
                B = tmp;
            }
            /*# Make sure point is not at same height as vertex*/
            if (point.y == A.y || point.y == B.y){
                point.y += _eps
            }
            if (point.y > B.y || point.y < A.y || point.x > Math.max(A.x, B.x)){
                /*# The horizontal ray does not intersect with the edge*/
                continue;
            }

            if (point.x < Math.min(A.x, B.x)){
                /*# The ray intersects with the edge inside = not inside continue try: m_edge = (B.y - A.y) / (B.x - A.x) except ZeroDivisionError: m_edge = _huge try: m_point = (point.y - A.y) / (point.x - A.x) except ZeroDivisionError: m_point = _huge if m_point >= m_edge:
                # The ray intersects with the edge*/
                inside = !inside
                continue;
            } else{
                var m_red;
                var m_blue;
                if (Math.abs(A.x - B.x) > _tiny){
                    m_red = (B.y - A.y) / (B.x - A.x)
                }else{
                    m_red = _huge
                }
                if (Math.abs(A.x - point.x) > _tiny){
                    m_blue = (point.y - A.y) / (point.x - A.x)
                }else{
                    m_blue = _huge
                }
                if(m_blue >= m_red){
                    inside = !inside
                }
            }
        }
        return inside
    }

    containsPolygon(points){
        for (var i = 0; i < points.length; i++){
            if(!this.contains(points[i])){
                return false;
            }
        }
        return true;


    }

    colisionPolygon(points){
        for (var i = 0; i < points.length; i++){
            if(this.contains(points[i])){
                return true;
            }
        }
        return false;


    }
}

class RayPolygons{
    houses;
    checkHouse;
    index;
    constructor(objects, checkObject, index){
        /*points: a list of Points in clockwise order.*/
        this.objects = objects;
        this.checkObject = checkObject;
        this.index = index;
    }


    checkColision(){
        var objectPolygon = this.checkObject.getPolygonPoints();
        var ray;
        var polygon;
        for(var i = 0; i<this.objects.length;i++){
            if(i == this.index || this.objects[i][0].isRoad()){
                continue;
            }
            polygon = this.objects[i][0].getPolygonPoints();
            ray = new RayPolygon(polygon);
            if(this.checkObject.isRoad()){
                if(ray.containsPolygon(objectPolygon)||ray.contains(this.checkObject.getCenterPoint())){

                    return true;
                }
                continue;
            }
            if(ray.colisionPolygon(objectPolygon)){

                return true;
            }
        }
        return false;
    }

    checkRoadColision(){
        var objectPolygon = this.checkObject.getPolygonPoints();
        var ray;
        var polygon;
        var objectRay = new RayPolygon(objectPolygon);;
        for(var i = 0; i<this.objects.length;i++){

            if(i == this.index){
                continue;
            }
            polygon = this.objects[i][0].getPolygonPoints();
            ray = new RayPolygon(polygon);
            
            if(this.checkObject.isRoad() && this.objects[i][0].isRoad()){
                if(ray.colisionPolygon(objectPolygon) || objectRay.colisionPolygon(polygon)){
                    this.checkObject.addRoadInCollision(i)
                }
            }
            if(!this.checkObject.isRoad() && this.objects[i][0].isRoad()){
                if(!this.checkObject.isRoadColision()){
                    if(ray.colisionPolygon(objectPolygon)|| objectRay.colisionPolygon(polygon)){
                            this.checkObject.setRoadColision(true);
                    }
                }else{
                    return 0;
                }
            }
        }
        if(this.checkObject.isRoad()){
            console.log(this.checkObject.getRoadsInCollision())
        }
        return 0;

    }

}

class RoadPath{
    constructor(road, objects, index){
        /*points: a list of Points in clockwise order.*/
        this.objects = objects;
        this.checkedObjects = [index]
        this.road = road
    }

    startCheckPath(){
        this.checkPath(this.road)
    }

    checkPath(road){
        road.setRoadColision(1);
        var roads = road.getRoadsInCollision();
        for(var i = 0; i<roads.length; i++){
            if(!this.checkedObjects.includes(roads[i])){
                this.checkedObjects.push(roads[i])
                this.checkPath(this.objects[roads[i]][0])
            }
        }


    }
}


/*q = new RayPolygon([new Point(20, 10),
                 new Point(50, 125),
                 new Point(125, 90),
                 new Point(150, 10)]);
    var p1 = new Point(75, 50);
    console.log(q.contains(p1))

    var p2 = new Point(200, 50)
    console.log(q.contains(p2))

    var p3 = new Point(35, 90)
    console.log(q.contains(p3))

    var p4 = new Point(50, 10)
    console.log(q.contains(p4))*/