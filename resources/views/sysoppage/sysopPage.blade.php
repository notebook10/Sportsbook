<!DOCTYPE html>
<html lang="en">
<head>
    <title>Grading</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet" href="css/jquery-confirm.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script src="js/jquery-confirm.js"></script>
    <script src="js/sysop.js"></script>
</head>
<body>
<input type="hidden" id="baseurl" value="{{ URL::to('/') }}">
<div class="jumbotron text-center">
    <h3>Grading</h3>
</div>

    <div class="container">

        <input type="hidden" name="_token" value="{{ csrf_token() }}">
        <input type="button" class="btn btn-large btn-primary" id="btnGrade" value="Grade">

            <table class="table">
                <thead>
                <tr>
                    <th>team</th>
                    <th>subtype</th>
                    <th>result</th>
                    <th  class="TgradeNo">gradeno</th>
                    <th>line</th>
                    <th>score</th>
                    <th>result</th>
                    <th>no of teams</th>
                    <th>finish</th>
                </tr>
                </thead>
                <tbody>
                @foreach($allBet as $value)
                <tr class="tr-bet" id="{{ $value->grade_no}}">
                    <td>{{ $value->team }}</td>
                    <td>{{ $value->subtype }}</td>
                    <td>{{ $value->result }}</td>
                    <td class="gradeNo">{{ $value->grade_no }}</td>
                    <td>{{ $value->line }}</td>
                    <td>{{ $value->score }}</td>
                    <td>{{ $value->result_type }}</td>
                    <td>{{ $value->noofteams }}</td>
                    <td>{{ $value->finish }}</td>
                </tr>
                @endforeach
                </tbody>
            </table>
    </div>

</body>
</html>


