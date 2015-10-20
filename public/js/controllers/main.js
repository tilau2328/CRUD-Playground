
angular.module('todoController', [])

.controller('mainController', function($scope, $http, Todos) {
    $scope.formData = {};

    // when landing on the page, get all todos and show them
    Todos.get().success(function(data) {
                    $scope.todos = data;
            })
            .error(function(data) {
                    console.log('Error: ' + data);
            });

    // when submitting the add form, send the text to the node API
    $scope.createTodo = function() {
         if(!$.isEmptyObject($scope.formData)){
            Todos.create($scope.formData).success(function(data) {
                            $scope.formData = {};
                            $scope.todos.push(data); 
                        })
                        .error(function(data) {
                                console.log('Error: ' + data);
                        });
        }
    };

    // delete a todo after checking it
    $scope.deleteTodo = function(id) {
            Todos.delete(id).success(function(data) {
                                var ans = [];
                                for(var i = 0; i<$scope.todos.length;i++){
                                    if($scope.todos[i]._id != id){
                                        ans.push($scope.todos[i]);
                                    }
                                }
                                console.log($scope.todos);
                                console.log(ans);
                                $scope.todos = ans;
                        })
                        .error(function(data) {
                                console.log('Error: ' + data);
                        });
    };
});