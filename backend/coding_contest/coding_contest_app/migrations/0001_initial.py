# Generated by Django 5.0.7 on 2024-10-03 05:59

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Contests',
            fields=[
                ('contest_id', models.AutoField(primary_key=True, serialize=False)),
                ('contest_name', models.CharField(max_length=100)),
                ('start_date_time', models.DateTimeField()),
                ('end_date_time', models.DateTimeField()),
                ('organization_type', models.CharField(max_length=50)),
                ('organization_name', models.CharField(max_length=100)),
                ('participant_limit', models.IntegerField()),
                ('contest_visibility', models.CharField(max_length=100)),
                ('contest_created_at', models.DateTimeField(auto_now_add=True)),
                ('contest_updated_at', models.DateTimeField(auto_now=True)),
                ('registration_deadline', models.DateTimeField()),
            ],
            options={
                'verbose_name': 'Contest',
                'db_table': 'contests',
            },
        ),
        migrations.CreateModel(
            name='Language',
            fields=[
                ('language_id', models.AutoField(primary_key=True, serialize=False)),
                ('language', models.CharField(max_length=50)),
            ],
            options={
                'verbose_name': 'Programming Language',
                'db_table': 'language',
            },
        ),
        migrations.CreateModel(
            name='Problems',
            fields=[
                ('problem_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=200)),
                ('description', models.TextField()),
                ('input_format', models.TextField()),
                ('output_format', models.TextField()),
                ('constraints', models.TextField(blank=True, null=True)),
                ('difficulty_level', models.CharField(max_length=50)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name': 'Problem',
                'db_table': 'problems',
            },
        ),
        migrations.CreateModel(
            name='Users',
            fields=[
                ('user_id', models.IntegerField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('phone_number', models.CharField(blank=True, max_length=15, null=True)),
                ('login_password', models.CharField(max_length=255)),
                ('overall_rank', models.IntegerField(blank=True, null=True)),
                ('user_created_at', models.DateTimeField(auto_now_add=True)),
                ('user_updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'verbose_name': 'User',
                'db_table': 'users',
            },
        ),
        migrations.CreateModel(
            name='ContestDetails',
            fields=[
                ('contest', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='coding_contest_app.contests')),
                ('contest_banner_image', models.CharField(blank=True, max_length=255, null=True)),
                ('contest_default_banner_image', models.CharField(blank=True, max_length=255, null=True)),
                ('about', models.TextField(blank=True, null=True)),
                ('eligibility', models.TextField(blank=True, null=True)),
                ('rules', models.TextField(blank=True, null=True)),
                ('others', models.TextField(blank=True, null=True)),
            ],
            options={
                'verbose_name': 'Contest Details',
                'db_table': 'contest_details',
            },
        ),
        migrations.CreateModel(
            name='ContestPrizes',
            fields=[
                ('prize_id', models.AutoField(primary_key=True, serialize=False)),
                ('prize_position', models.CharField(max_length=100)),
                ('prize_description', models.TextField(blank=True, null=True)),
                ('prize_amount', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('others', models.TextField(blank=True, null=True)),
                ('contest', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='coding_contest_app.contests')),
            ],
            options={
                'verbose_name': 'Contest Prizes',
                'db_table': 'contest_prizes',
            },
        ),
        migrations.CreateModel(
            name='ContestProblems',
            fields=[
                ('contest_problem_id', models.AutoField(primary_key=True, serialize=False)),
                ('order_of_problem_in_contest', models.IntegerField(blank=True, null=True)),
                ('weightage', models.IntegerField()),
                ('contest', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='coding_contest_app.contests')),
                ('problem', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='coding_contest_app.problems')),
            ],
            options={
                'verbose_name': 'Contest Problems',
                'db_table': 'contest_problems',
            },
        ),
        migrations.CreateModel(
            name='Samples',
            fields=[
                ('sample_id', models.AutoField(primary_key=True, serialize=False)),
                ('sample_input', models.TextField()),
                ('sample_output', models.TextField()),
                ('sample_order', models.IntegerField(blank=True, null=True)),
                ('problem', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='coding_contest_app.problems')),
            ],
            options={
                'verbose_name': 'Sample Input/Output',
                'db_table': 'sample_input_output',
            },
        ),
        migrations.CreateModel(
            name='Submissions',
            fields=[
                ('submission_id', models.AutoField(primary_key=True, serialize=False)),
                ('submitted_at', models.DateTimeField()),
                ('code', models.TextField(blank=True, null=True)),
                ('score', models.DecimalField(decimal_places=2, max_digits=5)),
                ('contest', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='submissions', to='coding_contest_app.contests')),
                ('language', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='submissions', to='coding_contest_app.language')),
                ('problem', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='submissions', to='coding_contest_app.problems')),
                ('participant', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='submissions', to='coding_contest_app.users')),
            ],
            options={
                'verbose_name': 'Submission',
                'db_table': 'submissions',
            },
        ),
        migrations.CreateModel(
            name='TestCases',
            fields=[
                ('testcase_id', models.AutoField(primary_key=True, serialize=False)),
                ('input', models.TextField()),
                ('expected_output', models.TextField()),
                ('time_limit', models.IntegerField()),
                ('memory_limit', models.IntegerField()),
                ('problem', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='coding_contest_app.problems')),
            ],
            options={
                'verbose_name': 'Test Case',
                'db_table': 'test_cases',
            },
        ),
        migrations.CreateModel(
            name='SubmissionResult',
            fields=[
                ('result_id', models.AutoField(primary_key=True, serialize=False)),
                ('is_passed', models.BooleanField()),
                ('execution_time', models.FloatField()),
                ('memory_used', models.IntegerField()),
                ('submission', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='coding_contest_app.submissions')),
                ('testcase', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='coding_contest_app.testcases')),
            ],
            options={
                'verbose_name': 'Submission Result',
                'db_table': 'submission_results',
            },
        ),
        migrations.CreateModel(
            name='UserDetails',
            fields=[
                ('detail_id', models.AutoField(primary_key=True, serialize=False)),
                ('bio', models.TextField(blank=True, null=True)),
                ('skills', models.TextField(blank=True, null=True)),
                ('achievements', models.TextField(blank=True, null=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='coding_contest_app.users')),
            ],
            options={
                'verbose_name': 'User Details',
                'db_table': 'user_details',
            },
        ),
        migrations.CreateModel(
            name='UserAddress',
            fields=[
                ('address_id', models.AutoField(primary_key=True, serialize=False)),
                ('address', models.TextField(blank=True, null=True)),
                ('state', models.CharField(max_length=100)),
                ('country', models.CharField(max_length=100)),
                ('pincode', models.CharField(max_length=10, null=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='coding_contest_app.users')),
            ],
            options={
                'verbose_name': 'User Address',
                'db_table': 'user_address',
            },
        ),
        migrations.CreateModel(
            name='SocialMediaLink',
            fields=[
                ('link_id', models.AutoField(primary_key=True, serialize=False)),
                ('platform_name', models.CharField(max_length=50)),
                ('link', models.URLField()),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='coding_contest_app.users')),
            ],
            options={
                'verbose_name': 'Social Media Links',
                'db_table': 'social_media_links',
            },
        ),
        migrations.CreateModel(
            name='Ranking',
            fields=[
                ('ranking_id', models.AutoField(primary_key=True, serialize=False)),
                ('rank', models.IntegerField()),
                ('total_score', models.DecimalField(decimal_places=2, max_digits=10)),
                ('time_taken', models.IntegerField()),
                ('contest', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='coding_contest_app.contests')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='coding_contest_app.users')),
            ],
            options={
                'verbose_name': 'Ranking',
                'db_table': 'ranking',
            },
        ),
        migrations.AddField(
            model_name='problems',
            name='host',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='coding_contest_app.users'),
        ),
        migrations.AddField(
            model_name='contests',
            name='host',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='coding_contest_app.users'),
        ),
        migrations.CreateModel(
            name='ContestRegistration',
            fields=[
                ('registration_id', models.AutoField(primary_key=True, serialize=False)),
                ('registration_date_and_time', models.DateTimeField(auto_now_add=True)),
                ('contest_submission_time', models.DateTimeField(blank=True, null=True)),
                ('total_time_taken', models.DurationField(blank=True, null=True)),
                ('contest', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='coding_contest_app.contests')),
                ('participant', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='coding_contest_app.users')),
            ],
            options={
                'verbose_name': 'Contest Registration',
                'db_table': 'contest_registration',
            },
        ),
    ]
